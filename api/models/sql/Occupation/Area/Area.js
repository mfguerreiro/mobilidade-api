import { Model, DataTypes } from 'sequelize';

class Area extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          field: 'idArea',
          autoIncrement: true,
        },
        area: {
          type: DataTypes.STRING,
          field: 'area',
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
        tableName: 'Area',
        modelName: 'Area',
      }
    );
    return this;
  }

  //associate
  static associate(models) {
    this.hasMany(models.UserOccupationRelation, {
      foreignKey: 'fkArea',
    });
  }
}

export default Area;
