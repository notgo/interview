import * as Koa from "koa"
import { BaseController } from '../lib/BaseController';
import * as packageConfig from '../../package.json'

class HomeController extends BaseController {
    async getVersion(ctx: Koa.Context, next: Koa.Next) {
        ctx.body = this.success('当前版本：' + (packageConfig as any).version);
    }

}
export default HomeController;