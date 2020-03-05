import * as Router from 'koa-router';
import * as compose from 'koa-compose';
import { selfish } from '../util/helper';
import HomeController from '../controller/home';
const homeController = selfish(new HomeController());
const router = new Router();
router.prefix('/api')
router.get('/version', homeController.getVersion)
const routes = router.routes();

export default () => compose([
    routes
]);
