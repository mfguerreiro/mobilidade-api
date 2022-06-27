import { Model, DataTypes } from 'sequelize';

class Vacancy extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          field: 'idVacancy',
          autoIncrement: true,
        },
        fkCompany: {
          type: DataTypes.INTEGER,
          field: 'fkCompany',
        },
        title: {
          type: DataTypes.STRING,
          field: 'title',
        },
        description: {
          type: DataTypes.STRING,
          field: 'description',
        },
        workTime: {
          type: DataTypes.STRING,
          field: 'workTime',
        },
        basicSchooling: {
          type: DataTypes.STRING,
          field: 'basicSchooling',
        },
        technicalProfile: {
          type: DataTypes.STRING,
          field: 'technicalProfile',
        },
        behaviorProfile: {
          type: DataTypes.STRING,
          field: 'behaviorProfile',
        },
        salary: {
          type: DataTypes.DECIMAL,
          field: 'salary',
        },
        benefits: {
          type: DataTypes.STRING,
          field: 'benefits',
        },
      },
      {
        sequelize,
        tableName: 'Vacancy',
        modelName: 'Vacancy',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Company, {
      foreignKey: 'fkCompany',
    });
  }
}

export default Vacancy;
