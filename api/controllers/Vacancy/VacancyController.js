//helpers
import ResponseBuilder from '../../helpers/responseBuilder';

//services
import VacancyService from '../../services/Vacancy/VacancyService';

const response = new ResponseBuilder();

class VacancyController {
  static async createOrUpdateVacancy(req, res) {
    try {
      const { vacancyId } = req.query;

      const {
        companyId,
        title,
        description,
        workTime,
        basicSchooling,
        technicalProfile,
        behaviorProfile,
        salary,
        benefits,
      } = req.body;

      const createdVacancy = await VacancyService.createOrUpdateVacancy(
        vacancyId,
        companyId,
        title,
        description,
        workTime,
        basicSchooling,
        JSON.stringify(technicalProfile),
        JSON.stringify(behaviorProfile),
        salary,
        JSON.stringify(benefits)
      );

      if (createdVacancy) {
        response.setSuccess(
          200,
          'Vacancy created or updated successfully!',
          createdVacancy
        );
        return response.send(res);
      } else {
        response.setError(
          400,
          'Vacancy are not created or updated. Check the informed parameters'
        );
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      response.setError(500, 'Erro!' + JSON.stringify(error));
      return response.send(res);
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.query;

      const vacancy = await VacancyService.getById(id);

      if (vacancy) {
        response.setSuccess(200, 'Vacancy founded successfully!', vacancy);
        return response.send(res);
      } else {
        response.setError(
          400,
          'Vacancy are not founded. Check the informed parameters'
        );
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      response.setError(500, 'Erro!' + JSON.stringify(error));
      return response.send(res);
    }
  }

  static async getAll(req, res) {
    try {
      const { start, length, search, col, dir } = req.query;

      const vacancies = await VacancyService.getAll(
        start,
        length,
        search,
        col,
        dir
      );

      let total = await VacancyService.countVacancies();
      let filter = total;
      if (search.trim() != '')
        filter = await VacancyService.countVacancies(search);

      if (vacancies) {
        response.setSuccess(200, 'Vacancy founded successfully!', {
          list: vacancies,
          total,
          filter,
        });
        return response.send(res);
      } else {
        response.setError(
          400,
          'Vacancies not founded. Check the informed parameters'
        );
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      response.setError(500, 'Erro!' + JSON.stringify(error));
      return response.send(res);
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.query;

      const deletedVacancy = await VacancyService.delete(id);

      if (deletedVacancy) {
        response.setSuccess(
          200,
          'Vacancy deleted successfully!',
          deletedVacancy
        );
        return response.send(res);
      } else {
        response.setError(
          400,
          'Vacancy are not deleted. Check the informed parameters'
        );
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      response.setError(500, 'Erro!' + JSON.stringify(error));
      return response.send(res);
    }
  }
}

export default VacancyController;
