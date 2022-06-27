import { Router } from 'express';
import AddressRoutes from '../routes/AddressRoutes';
import UserRoutes from '../routes/UserRoutes';
import HrRoutes from '../routes/HrRoutes';
import Auth from '../middlewares/auth/index';

const routes = new Router();

routes.use('/user', UserRoutes);
routes.use('/address', AddressRoutes);
routes.use('/hr', HrRoutes);
routes.use('/protegido', Auth(2), () => {
  console.log('protegido');
});

routes.get('/', function (req, res) {
  res.status(200).send('MOBILIDADE SERVER API - Verifica nossa documentação.');
});

routes.get('*', function (req, res) {
  res.status(404).send('MOBILIDADE SERVER API - Não encontramos.');
});

export default routes;
