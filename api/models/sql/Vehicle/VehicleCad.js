import { Model, DataTypes } from 'sequelize';

class VehicleCad extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          field: 'idVehicle',
          autoIncrement: true,
        },
        vehicle: {
          type: DataTypes.STRING,
          field: 'vehicle',
        },
        plate: {
          type: DataTypes.STRING,
          field: 'plate',
        },
        register: {
          type: DataTypes.STRING,
          field: 'register',
        },
        color: {
          type: DataTypes.STRING,
          field: 'color',
        },
        places: {
          type: DataTypes.INTEGER,
          field: 'places',
        },
        fkVehicleVendor: {
          type: DataTypes.INTEGER,
          field: 'fkVehicleVendor',
        },
        fkVehicleType: {
          type: DataTypes.INTEGER,
          field: 'fkVehicleType',
        },
        fkVehicleStatus: {
          type: DataTypes.INTEGER,
          field: 'fkVehicleStatus',
        },
        fkUserProfessional: {
          type: DataTypes.INTEGER,
          field: 'fkUserProfessional',
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
        tableName: 'VehicleCad',
        modelName: 'VehicleCad',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.VehicleVendor, {
      foreignKey: 'fkVehicleVendor',
    });
  }

  static associate(models) {
    this.belongsTo(models.VehicleType, {
      foreignKey: 'fkVehicleType',
    });
  }

  static associate(models) {
    this.belongsTo(models.VehicleStatus, {
      foreignKey: 'fkVehicleStatus',
    });
  }

  //fkUserProfessional <--- Falta FK
}

export default VehicleCad;
