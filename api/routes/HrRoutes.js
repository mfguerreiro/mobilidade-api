import { Router } from 'express';
import VacancyController from '../controllers/Vacancy/VacancyController';
import CompanyController from '../controllers/Company/CompanyController';
import QualificationController from '../controllers/Qualification/QualificationController';
import AreaController from '../controllers/Occupation/Area/AreaController';
import OccupationController from '../controllers/Occupation/Occupation/OccupationController';
import SpecialtyController from '../controllers/Occupation/Specialty/SpecialtyController';
import UserOccupationRelationController from '../controllers/Occupation/UserOccupationRelation/UserOccupationRelationController';
import UserProfileController from '../controllers/Profile/ProfileController';

const router = Router();

//HUMAN RESOURSES ROUTES

//Vacancy
router.route('/vacancy').post(VacancyController.createOrUpdateVacancy);
router.route('/vacancy').get(VacancyController.getAll);
router.route('/vacancy/id').get(VacancyController.getById);
router.route('/vacancy').delete(VacancyController.delete);

//Company
router.route('/company').put(CompanyController.createOrUpdateCompany);
router.route('/company').post(CompanyController.createOrUpdateCompany);
router.route('/companyGet').post(CompanyController.getAll);
router.route('/company/id').get(CompanyController.getById);
router.route('/company/getByUser').get(CompanyController.getByUser);
router.route('/company').delete(CompanyController.delete);

//Qualification
router
  .route('/qualification')
  .post(QualificationController.createOrUpdateQualification);
router
  .route('/qualification/getByUser')
  .get(QualificationController.getByUserId);
router.route('/qualification/id').get(QualificationController.getById);
router.route('/qualification').delete(QualificationController.delete);

//UserOccupation
//Area
router.route('/area').post(AreaController.create);
router.route('/areaGet').post(AreaController.getAll);
router.route('/area').delete(AreaController.delete);

//Occupation
router.route('/occupation').post(OccupationController.create);
router.route('/occupationGet').post(OccupationController.getAll);
router.route('/occupation').delete(OccupationController.delete);

//Profile
router.route('/getProfile').get(UserProfileController.getProfile);
router.route('/updateProfile').put(UserProfileController.changeProfile);

//Specialty
router.route('/specialty').post(SpecialtyController.create);
router.route('/specialtyGet').post(SpecialtyController.getAll);
router.route('/specialty').delete(SpecialtyController.delete);

//UserRelation
router.route('/userRelation').post(UserOccupationRelationController.create);
router
  .route('/userRelationGetByUser')
  .post(UserOccupationRelationController.getAllByUser);
router.route('/userRelation').delete(UserOccupationRelationController.delete);

export default router;
