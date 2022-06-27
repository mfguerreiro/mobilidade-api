import { Model, DataTypes } from 'sequelize';

class Specialty extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          field: 'idSpecialty',
          autoIncrement: true,
        },
        specialty: {
          type: DataTypes.STRING,
          field: 'specialty',
        },
        fkArea: {
          type: DataTypes.INTEGER,
          field: 'fkArea',
        },
        fkOccupation: {
          type: DataTypes.INTEGER,
          field: 'fkOccupation',
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
        tableName: 'Specialty',
        modelName: 'Specialty',
      }
    );
    return this;
  }

  //associate
  static associate(models) {
    this.hasMany(models.UserOccupationRelation, {
      foreignKey: 'fkSpecialty',
    });
  }  
}

export default Specialty;
