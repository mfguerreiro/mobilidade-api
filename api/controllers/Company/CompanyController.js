//helpers
import ResponseBuilder from '../../helpers/responseBuilder';

//Services
import CompanyService from '../../services/Company/CompanyService';

const response = new ResponseBuilder();

class CompanyController {
  static async createOrUpdateCompany(req, res) {
    try {
      const { companyId } = req.query;

      const { userId, companyName, tradingName, employeeNumber } = req.body;

      const createdOrUpdatedCompany =
        await CompanyService.createOrUpdateCompany(
          companyId,
          userId,
          companyName,
          tradingName,
          employeeNumber
        );

      if (createdOrUpdatedCompany) {
        response.setSuccess(
          200,
          'Company created or updated successfully!',
          createdOrUpdatedCompany
        );
        return response.send(res);
      } else {
        response.setError(
          400,
          'Company are not created or updated. Check the informed parameters'
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
      const { companyId } = req.query;

      const Company = await CompanyService.getById(companyId);

      if (Company) {
        response.setSuccess(200, 'Company founded successfully!', Company);
        return response.send(res);
      } else {
        response.setError(
          400,
          'Company are not founded. Check the informed parameters'
        );
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      response.setError(500, 'Erro!' + JSON.stringify(error));
      return response.send(res);
    }
  }

  static async getByUser(req, res) {
    try {
      const { userId } = req.query;

      const company = await CompanyService.getByUserId(userId);

      if (company) {
        response.setSuccess(200, 'Company founded successfully!', company);
        return response.send(res);
      } else {
        response.setError(
          400,
          'Company are not founded. Check the informed parameters'
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
      const { start, length, search, col, dir, draw } = req.body;

      const Company = await CompanyService.getAll(
        start,
        length,
        search && search['value'] ? search['value'] : null,
        col,
        dir
      );

      let total = await CompanyService.countCompanies();
      let filter = total;
      if (search && search['value'] && search['value'].trim() != '')
        filter = await CompanyService.countCompanies(search['value']);

      if (Company) {
        //response.setSuccess(200, 'Company founded successfully!', Company);
        //return response.send(res);
        const mapData = Company.map(function (row) {
          const result = row.get();
          result.fkUser =
            result.fkUser +
            ' | ' +
            row.UserCad.get('fullName') +
            ' | ' +
            row.UserCad.get('email');
          delete result.Usercad;
          return result;
        });

        return res.send({
          draw,
          recordsTotal: total,
          recordsFiltered: filter,
          data: mapData,
        });
      } else {
        response.setError(
          400,
          'Company are not founded. Check the informed parameters'
        );
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      response.setError(
        500,
        'Company are not founded. Check the informed parameters'
      );
      response.setError(400, error);
      return response.send(res);
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.query;

      const deletedCompany = await CompanyService.delete(id);

      if (deletedCompany) {
        response.setSuccess(
          200,
          'Company deleted successfully!',
          deletedCompany
        );
        return response.send(res);
      } else {
        response.setError(
          400,
          'Company are not deleted. Check the informed parameters'
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

export default CompanyController;
