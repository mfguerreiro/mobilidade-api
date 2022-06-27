import Area from '../../../models/sql/Occupation/Area/Area';
import moment from 'moment';

class AreaService {
  static async getAll() {
    try {
      return Area.findAll({
        attributes: ['id', 'area'],
        raw: true,
      });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async create(area) {
    try {
      const upperArea = area.toUpperCase();

      const existingArea = await Area.findOne({ where: { area: upperArea } });

      if (!existingArea) return null;

      return Area.create({ area });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  static async delete(id) {
    try {
      const area = await Area.findOne({ where: { id } });

      if (!area) return null;

      return Area.update(
        { deletedAt: moment() },
        {
          where: {
            id,
          },
        }
      );
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}

export default AreaService;
