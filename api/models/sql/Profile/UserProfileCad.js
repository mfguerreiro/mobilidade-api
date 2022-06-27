import { Model, DataTypes } from 'sequelize';

class UserProfileCad extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          field: 'idUserProfile',
          autoIncrement: true,
        },
        profile: {
          type: DataTypes.TEXT,
          field: 'summary',
        },        
        professional: {
          type: DataTypes.TEXT,
          field: 'professionalExperience',
        },
        fkUser: {
          type: DataTypes.INTEGER,
          field: 'fkUser',
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
        tableName: 'UserProfile',
        modelName: 'UserProfile',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.UserCad, {
      foreignKey: 'fkUser',
    });
  }
}

export default UserProfileCad;
