import { Model, DataTypes } from 'sequelize';

class VehicleType extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          field: 'idVehicleType',
          autoIncrement: true,
        },
        type: {
          type: DataTypes.STRING,
          field: 'type',
        },
        icon: {
          type: DataTypes.STRING,
          field: 'icon',
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
        tableName: 'VehicleType',
        modelName: 'VehicleType',
      }
    );
    return this;
  }

  //associate
}

export default VehicleType;
