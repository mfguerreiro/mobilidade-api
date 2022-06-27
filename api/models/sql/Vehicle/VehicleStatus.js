import { Model, DataTypes } from 'sequelize';

class VehicleStatus extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          field: 'idVehicleStatus',
          autoIncrement: true,
        },
        status: {
          type: DataTypes.STRING,
          field: 'status',
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
        tableName: 'VehicleStatus',
        modelName: 'VehicleStatus',
      }
    );
    return this;
  }

  //associate
}

export default VehicleStatus;
