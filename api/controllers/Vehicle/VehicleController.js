//helpers
import ResponseBuilder from '../../helpers/responseBuilder';

//services
import VehicleService from '../../services/Vehicle/VehicleService';
const response = new ResponseBuilder();

class VehicleController {
  static async createVehicle(req, res) {
    try {
      const {
        vehicle = null,
        plate,
        registerNumber,
        color = null,
        places,
        vendor = null,
        type,
        professionalId: fkUserProfessional,
      } = req.body;

      //checar obrigatoriedade nos parametros
      if (!plate || !registerNumber || !places || !type) {
        response.setError(
          400,
          'Mandatory parameters are not informed correctly',
          {
            plate,
            registerNumber,
            places,
            type,
          }
        );
        return response.send(res);
      }

      const createdVehicle = await VehicleService.createVehicle(
        vehicle,
        plate,
        registerNumber,
        color,
        places,
        vendor,
        type,
        fkUserProfessional
      );

      if (createdVehicle) {
        response.setSuccess(
          200,
          'Vehicle created successfully!',
          createdVehicle
        );
        return response.send(res);
      } else {
        response.setError(
          400,
          'Vehicle are not created. Check the informed parameters'
        );
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      response.setError(500, 'Erro!' + JSON.stringify(error));
      return response.send(res);
    }
  }

  static async getVehicleTypes(req, res) {
    try {
      console.log('\n\n entrou nogetVehicleTypes');
      //IMPLEMENTAÇÃO FUTURA: PEGAR OS TIPOS DE VEÍCULOS NOS PARAMETROS QUE O CLIENTE ESCOLHEU
      //CLIENTE ESCOLHE QUAIS VEICULOS VAI TRABALHAR E SALVA NOS PARAMETROS
      //TENTAMOS PEGAR DOS PARAMETROS, SE NÃO TIVER NADA, RETORNA TUDO OU GERA ERRO?

      //** ATUALMENTE PEGANDO APENAS OS REGISTRADOS NO POSTGRES */

      const vehicleTypes = await VehicleService.getVehicleTypes();

      if (vehicleTypes) {
        response.setSuccess(
          200,
          'Vehicle types loaded successfully!',
          vehicleTypes
        );
        return response.send(res);
      } else {
        response.setError(400, 'Vehicle types cannot be loaded!');
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async getVehicleVendors(req, res) {
    try {
      //IMPLEMENTAÇÃO FUTURA: PEGAR as marcas DE VEÍCULOS NOS PARAMETROS QUE O CLIENTE ESCOLHEU
      //CLIENTE ESCOLHE QUAIS VEICULOS VAI TRABALHAR E SALVA NOS PARAMETROS
      //TENTAMOS PEGAR DOS PARAMETROS, SE NÃO TIVER NADA, RETORNA TUDO OU GERA ERRO?

      //** ATUALMENTE PEGANDO APENAS OS REGISTRADOS NO POSTGRES */

      const vehicleVendors = await VehicleService.getVehicleVendors();

      if (vehicleVendors) {
        response.setSuccess(
          200,
          'Vehicle Vendors loaded successfully!',
          vehicleVendors
        );
        return response.send(res);
      } else {
        response.setError(400, 'Vehicle Vendors cannot be loaded!');
        return response.send(res);
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}

export default VehicleController;
