//Models
import VehicleCad from '../../models/sql/Vehicle/VehicleCad';
import VehicleType from '../../models/sql/Vehicle/VehicleType';
import VehicleVendor from '../../models/sql/Vehicle/VehicleVendor';

//Enums
import { EnumVehicleStatus } from '../../helpers/Enums';

class VehicleService {
  static async createVehicle(
    vehicle,
    plate,
    register,
    color,
    places,
    vendor,
    type,
    fkUserProfessional
  ) {
    try {
      const existingVehicle = await this.getVehicleByRegister(register);

      if (existingVehicle) {
        return null;
      }

      const createdVehicle = await VehicleCad.create({
        vehicle,
        plate,
        register,
        color,
        places,
        fkVehicleVendor: parseInt(vendor),
        fkVehicleType: parseInt(type),
        fkVehicleStatus: EnumVehicleStatus.Active,
        fkUserProfessional,
      });

      return createdVehicle || null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async getVehicleByRegister(register) {
    try {
      const vehicle = await VehicleCad.findOne({
        where: {
          register,
        },
      });

      return vehicle || null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async getVehicleTypes() {
    try {
      const vehicleTypes = await VehicleType.findAll({
        attributes: ['id', 'type', 'icon'],
      });

      return vehicleTypes || null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async getVehicleVendors() {
    try {
      const vehicleVendors = await VehicleVendor.findAll({
        attributes: ['id', 'vendor', 'icon'],
      });

      return vehicleVendors || null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}

export default VehicleService;
