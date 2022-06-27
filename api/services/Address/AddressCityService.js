import AddressCity from '../../models/sql/Address/AddressCity';
import AddressState from '../../models/sql/Address/AddressState';

class AddressCityService {
  static async getCityByName(name) {
    try {
      if (!name) {
        return null;
      }

      const city = await AddressCity.findOne({
        where: {
          city: name,
        },
        raw: true,
      });

      if (!city) {
        return null;
      } else {
        return city;
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  static async getCityByState(fkState) {
    try {
      if (!fkState) {
        return null;
      }

      const city = await AddressCity.findAll({
        where: {
          fkState,
        },
        order:[['city', 'ASC']],
        raw: true,
      });

      if (!city) {
        return null;
      } else {
        return city;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }  
  static async getAllTable(
    start = 0,
    length = 25,
    search = '',
    col = null,
    dir = null
  ) {
    try {
      let where = {};

      if (search && search.trim() != '') {
        where = {
          [Op.or]: [
            { city: { [Op.like]: `%${search.trim()}%` } },
            { cityUpperCase: { [Op.like]: `%${search.trim()}%` } }
          ],
        };
      }

      const order = [];
      if (col != null && dir != null) {
        order.push([col, dir]);
      }

      const state = await AddressCity.findAll({
        where,
        offset: parseInt(start),
        limit: parseInt(length),
        include:[
          {
            model:AddressState
          }
        ],
        order
      });

      return state || null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }    
  static async countCities(search = '') {
    try {
      let where = {};

      if (search.trim() != '') {
        where = {
          [Op.or]: [
            { city: { [Op.like]: `%${search.trim()}%` } },
            { cityUpperCase: { [Op.like]: `%${search.trim()}%` } }
          ],
        };
      }

      const city = await AddressCity.count({
        where,
      });

      return city || 0;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }  
}

export default AddressCityService;
