import { Model, DataTypes } from 'sequelize';

class VehicleVendor extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          field: 'idVendor',
          autoIncrement: true,
        },
        vendor: {
          type: DataTypes.STRING,
          field: 'vendor',
        },
        icon: {
          type: DataTypes.STRING,
          field: 'icon',
        },
        active: {
          type: DataTypes.TINYINT,
          field: 'active',
        },
        deletedAt: {
          type: DataTypes.DATE,
          defaultValue: null,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: 'VehicleVendor',
        modelName: 'VehicleVendor',
      }
    );
    return this;
  }

  //associate
}

export default VehicleVendor;
