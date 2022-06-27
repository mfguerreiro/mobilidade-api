import { Model, DataTypes } from 'sequelize';

class AddressCity extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          field: 'idCity',
          autoIncrement: true,
        },
        city: {
            type: DataTypes.STRING,
            field: 'city',
        }, 
        cityUpperCase: {
            type: DataTypes.STRING,
            field: 'cityUpperCase',
        },        
        ddd: DataTypes.INTEGER,
        latitude: {
          type: DataTypes.FLOAT,
          field: 'latitude',
        },
        longitude: {
          type: DataTypes.FLOAT,
          field: 'longitude',
        },
        fkState: {
            type: DataTypes.INTEGER,
            field: 'fkState',
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
        tableName: 'AddressCity',
        modelName: 'AddressCity',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.AddressState, {
      foreignKey: 'fkState',
    });
  }

}

export default AddressCity;
