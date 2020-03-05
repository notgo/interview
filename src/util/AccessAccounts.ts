import { OAccount } from '../schema/account';
export class AccessAccounts {
    private static instance: AccessAccounts
    accounts: OAccount[];

    private constructor() {
        this.accounts = [];
    }

    static getInstance() {
        return this.instance || (this.instance = new AccessAccounts())
    }

}