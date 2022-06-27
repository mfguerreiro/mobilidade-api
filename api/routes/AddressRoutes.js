import { Router } from 'express';
import CityController from '../controllers/City/CityController';
import StateController from '../controllers/State/StateController';

const router = Router();

router.route('/state').get(StateController.getAllStates);
router.route('/citiesByState').get(CityController.getCitiesByState);

export default router;
