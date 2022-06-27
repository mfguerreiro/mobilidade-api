import xlsx from 'node-xlsx';
import valid from '../../../helpers';

import City from '../../../models/sql/Address/AddressCity';
import State from '../../../models/sql/Address/AddressState';

export default class LogService {
  static async importCitiesXlS() {
    const workSheetsFromFile = xlsx.parse(
      `${__dirname}/RELATORIO_DTB_BRASIL_MUNICIPIO.xls`
    );

    //console.log(workSheetsFromFile[0].data);
    if (
      valid.Isobject(workSheetsFromFile) &&
      valid.Isobject(workSheetsFromFile[0])
    ) {
      const linhas = workSheetsFromFile[0].data.length;

      console.log(linhas);

      for (var lns = 0; lns < linhas; lns++) {
        let row = workSheetsFromFile[0].data[lns];

        //console.log(row);

        if (row.length > 0 && lns > 0) {
          console.log(row[0], row[1]);
          let [state] = await State.findOrCreate({
            where: { id: row[0], state: row[1] },
            defaults: {
              fkCountry: 1,
            },
          });

          let idState = state.id;
          console.log('state', idState);

          console.log('state ---');

          console.log(row[11], row[12], idState);
          let [city] = await City.findOrCreate({
            where: { id: row[11], city: row[12], fkState: idState },
            defaults: {
              cityUpperCase: valid.normalizeTextLow(row[12]).toUpperCase(),
            },
          });

          console.log('city', city);
        }
      }
    }
  }

  static async importCitiesDDDXlS() {
    const workSheetsFromFile = xlsx.parse(`${__dirname}/PGCN.xlsx`);

    //console.log(workSheetsFromFile[0].data);
    if (
      valid.Isobject(workSheetsFromFile) &&
      valid.Isobject(workSheetsFromFile[0])
    ) {
      const linhas = workSheetsFromFile[0].data.length;

      console.log(linhas);

      for (var lns = 0; lns < linhas; lns++) {
        let row = workSheetsFromFile[0].data[lns];

        //console.log(row);

        if (row.length > 0 && lns > 0) {
          await City.update(
            { ddd: row[3] },
            { where: { id: parseInt(row[0]) } }
          );

          console.log('ddd', linhas - lns);
        }
      }
    }
  }

  static async importCitiesLatLng() {
    const workSheetsFromFile = xlsx.parse(
      `${__dirname}/CIDADES_CAPITAIS_IBGE_OTAVIO.xlsx`
    );

    //console.log(workSheetsFromFile[0].data);
    if (
      valid.Isobject(workSheetsFromFile) &&
      valid.Isobject(workSheetsFromFile[0])
    ) {
      const linhas = workSheetsFromFile[0].data.length;

      console.log(linhas);

      for (var lns = 0; lns < linhas; lns++) {
        let row = workSheetsFromFile[0].data[lns];

        //console.log(row);

        if (row.length > 0 && lns > 0) {
          let city = await City.findOne({
            where: {
              cityUpperCase: valid.normalizeTextLow(row[1]).toUpperCase(),
            },
          });

          if (city != null && valid.Isobject(city)) {
            await City.update(
              { latitude: row[3], longitude: row[4] },
              { where: { id: city.get('id') } }
            );

            console.log('latlng', linhas - lns);
          }
        }
      }
    }
  }
}
