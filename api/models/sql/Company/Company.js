import { Model, DataTypes } from 'sequelize';

class Company extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          field: 'idCompany',
          autoIncrement: true,
        },
        fkUser: {
          type: DataTypes.INTEGER,
          field: 'fkUser',
        },
        companyName: {
          type: DataTypes.STRING,
          field: 'companyName',
        },
        tradingName: {
          type: DataTypes.STRING,
          field: 'tradingName',
        },
        employeeNumber: {
          type: DataTypes.INTEGER,
          field: 'employeeNumber',
        },
      },
      {
        sequelize,
        tableName: 'Company',
        modelName: 'Company',
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

export default Company;
