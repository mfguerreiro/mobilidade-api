import { Model, DataTypes } from 'sequelize';

class AddressCountry extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          field: 'idCountry',
          autoIncrement: true,
        },
        country: {
            type: DataTypes.STRING,
            field: 'country',
        },        
        ddi: {
            type: DataTypes.INTEGER,
            field: 'ddi',
        },   
        lang: {
          type: DataTypes.STRING,
          field: 'langCode',
        },      
        code: {
          type: DataTypes.STRING,
          field: 'isoNumber',
        },  
        number: {
          type: DataTypes.STRING,
          field: 'isoCode',
        },    
        fkCurrency: {
          type: DataTypes.INTEGER,
          field: 'fkCurrency',
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
        tableName: 'AddressCountry',
        modelName: 'AddressCountry',
      }
    );
    return this;
  }


}

export default AddressCountry;
