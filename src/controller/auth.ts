import * as Koa from "koa"
import { BaseController } from '../lib/BaseController';
import { IAccount } from '../schema/account';
import { ValidateUtil } from '../util/Classvalidator';
import { AccessAccounts } from '../util/AccessAccounts';
import AuthService from '../service/auth';
import { logger } from '../plugin/Logger';

class AuthController extends BaseController {
    authService: AuthService;
    accessAccounts: AccessAccounts;
    constructor() {
        super();
        this.authService = new AuthService();
        this.accessAccounts = AccessAccounts.getInstance();
    }

    async auth(ctx: Koa.Context, next: Koa.Next) {
        const body = ctx.request.body;
        let iAccount: IAccount;
        try {
            iAccount = await ValidateUtil.getInstance().validate(IAccount, body)
        } catch (err) {
            return ctx.body = this.clientError(err.message)
        }

        try {
            const account = await this.authService.checkAccout(iAccount);
            if (account) {
                ctx.body = this.success(account);
                this.accessAccounts.accounts.push(account);
            } else {
                ctx.status = 401;
                ctx.body = this.loginInvalidError("登录失败");
            }
        } catch (err) {
            logger.trackException(err);
            return ctx.body = this.serverError(err.message)
        }
    }

    async getAccount(ctx: Koa.Context, next: Koa.Next) {
        ctx.body = this.success(ctx.accountInfo);
    }

}
export default AuthController;