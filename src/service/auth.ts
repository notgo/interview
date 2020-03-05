import { v4 as uuidv4 } from "uuid"
import { BaseService } from '../lib/BaseService';
import { IAccount, OAccount } from '../schema/account';

class AuthService extends BaseService {
    accounts = [{
        account: 'admin',
        password: '123456',
        name: 'admin',
        age: 30
    }];

    async checkAccout(iAccount: IAccount) {
        let oAccount: OAccount = null;
        this.accounts.forEach(account => {
            if (account.account === iAccount.account && account.password === iAccount.password) {
                oAccount = {
                    token: uuidv4(),
                    account: iAccount.account,
                    name: account.name,
                    age: account.age
                };
            }
        })

        return oAccount;
    }
}
export default AuthService;