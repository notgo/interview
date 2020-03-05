export class BaseController {
    constructor() {

    }

    success(data: any = {}): any {
        return {
            code: 200,
            message: "成功",
            data
        }
    }

    clientError(errMsg: string = '客户端错误', code: number = 400): any {
        return {
            code,
            message: errMsg,
            data: {}
        }
    }

    serverError(errMsg: string = '服务端错误'): any {
        return {
            code: 500,
            message: errMsg,
            data: {}
        }
    }

    loginInvalidError(errMsg: string = '登录失效', code: number = 401): any {
        return {
            code,
            message: errMsg,
            data: {}
        }
    }
}