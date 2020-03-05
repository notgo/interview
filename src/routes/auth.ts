import * as Router from 'koa-router';
import AuthController from '../controller/auth';
const authController = new AuthController();
const router = new Router();
router.prefix('/api/auth')
router.post('/login', authController.auth.bind(authController))
router.get('/getAccount', authController.getAccount.bind(authController))
router.get('/getVersion', authController.getVersion.bind(authController))

export default router;
