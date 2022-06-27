import { Model, DataTypes } from 'sequelize';

class Occupation extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          field: 'idOccupation',
          autoIncrement: true,
        },
        occupation: {
          type: DataTypes.STRING,
          field: 'occupation',
        },
        fkArea: {
          type: DataTypes.INTEGER,
          field: 'fkArea',
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
        tableName: 'Occupation',
        modelName: 'Occupation',
      }
    );
    return this;
  }

  //associate
  static associate(models) {
    this.hasMany(models.UserOccupationRelation, {
      foreignKey: 'fkOccupation',
    });
  }
}

export default Occupation;
