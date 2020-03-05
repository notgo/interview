
import * as Koa from "koa"
import { AccessAccounts } from '../util/AccessAccounts';
import { OAccount } from '../schema/account';
export default function () {
    return async function isLogin(ctx: Koa.Context, next: Koa.Next) {
        const accessAccounts = AccessAccounts.getInstance();
        let accountInfo: OAccount = null;
        const token = ctx.request.headers['token'] || ctx.request.query.token;
        console.log('token:', token);
        if (!token) {
            return ctx.body = {
                code: 401, msg: '缺少登录凭据', data: {},
            };
        }
        accessAccounts.accounts.forEach(account => {
            if (token === account.token) {
                accountInfo = account;
            }
        });

        if (!accountInfo) {
            return ctx.body = {
                code: 401, msg: '登录凭据失效', data: {}
            };
        }

        ctx.token = token;
        ctx.accountInfo = accountInfo;
        await next();
    };
};
