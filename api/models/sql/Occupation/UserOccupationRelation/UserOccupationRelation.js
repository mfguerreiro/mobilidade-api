import { Model, DataTypes } from 'sequelize';

class UserOccupationRelation extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          field: 'idUserOccupationRelation',
          autoIncrement: true,
        },
        fkUser: {
          type: DataTypes.INTEGER,
          field: 'fkUser',
        },
        fkSpecialty: {
          type: DataTypes.INTEGER,
          field: 'fkSpecialty',
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
        tableName: 'UserOccupationRelation',
        modelName: 'UserOccupationRelation',
      }
    );
    return this;
  }

  //associate
  static associate(models) {
    this.belongsTo(models.Area, {
      foreignKey: 'fkArea',
    });
    this.belongsTo(models.Occupation, {
      foreignKey: 'fkOccupation',
    });    
    this.belongsTo(models.Specialty, {
      foreignKey: 'fkSpecialty',
    });    
  }
}

export default UserOccupationRelation;
