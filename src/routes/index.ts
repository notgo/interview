import * as compose from 'koa-compose';
import auth from './auth';
import home from './home';

export default () => compose([
    home(),
    auth(),
]);