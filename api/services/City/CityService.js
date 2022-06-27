import AddressCity from '../../models/sql/AddressCity/AddressCity';

class CityService {
  static async getCitiesByState(stateId) {
    try {
      return AddressCity.findAll({
        where: { fkState: stateId },
        attributes: ['id', 'city', 'fkState'],
        raw: true,
      });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}

export default CityService;
