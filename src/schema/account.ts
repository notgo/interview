import { Length, Min, Max, IsNotEmpty } from 'class-validator';

export class IAccount {
    @Length(2, 10)
    account: string
    @IsNotEmpty()
    password: string
}

export class OAccount {
    token: string
    @Length(2, 10)
    account: string
    name: string
    age: number
}
