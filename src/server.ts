import * as Koa from 'koa';
import * as json from 'koa-json';
import * as bodyparser from 'koa-bodyparser';
import authRouter from './routes/auth';
import isAuthMiddleware from './middleware/isAuth';
const unless = function (path: string, middleware: any) {
    return function (ctx: Koa.Context, next: Koa.Next) {
        if (path === ctx.request.path) {
            return next();
        } else {
            return middleware(ctx, next);
        }
    };
};
const app = new Koa();
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(json());

app.use(async (ctx, next) => {
    const start: number = new Date().getTime();
    await next();
    const end: number = new Date().getTime();
    const ms = end - start;
    //记录每个请求日志
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});
app.use(unless('/api/auth/login', isAuthMiddleware()));
app.use(authRouter.routes());
app.listen(3000);
