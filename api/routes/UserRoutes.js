import Auth from '../middlewares/auth';
import { Router } from 'express';
import UserController from '../controllers/User/UserController';
import AddressController from '../controllers/Address/AddressController';
import VehicleController from '../controllers/Vehicle/VehicleController';
import ProfessionalController from '../controllers/Professional/ProfessionalController';
import Validation from '../helpers/validations';

const router = Router();

//ADICIONAR TOKEN FIXO PARA O APP EM TODAS AS ROTAS!

//USER
router.route('/authenticate').post(UserController.auth);
router.route('/authByToken').post(UserController.authByToken);
router.route('/refresh').post(UserController.refresh);
router.route('/registerUser').post(UserController.createUser);
router.route('/updateUser').put(UserController.updateUser);
router.route('/removeUser').delete(UserController.removeUser);
router.route('/getById').get(UserController.getUserById);
router.route('/getAll').get(UserController.getUsers);
router.route('/checkEmail').post(Validation.validateEmail);

//USER IMAGEM
router.route('/savePicture').post(UserController.createUserPicture);
router.route('/removePicture').delete(UserController.removeUserPicture);
router.route('/getPicture').get(UserController.getUserPictures);

//ADDRESS
router.route('/getCity').get(AddressController.getCity);
router.route('/getState').get(AddressController.getState);
router.route('/getAddress').get(AddressController.getAddress);
router.route('/registerAddress').post(AddressController.createAddress);
router.route('/updateAddress').put(AddressController.updateAddress);

//VEHICLE
router.route('/registerVehicle').post(VehicleController.createVehicle);
router
  .route('/getVehicleTypes')
  .get(Auth(2), VehicleController.getVehicleTypes);
router.route('/getVehicleVendors').get(VehicleController.getVehicleVendors);

//PROFESSIONAL
router
  .route('/registerProfessional')
  .post(ProfessionalController.createProfessional);
router
  .route('/getProfessionalParameters')
  .get(ProfessionalController.getProfessionalParameters);

export default router;
