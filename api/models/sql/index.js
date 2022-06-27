import fs, { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
const basename = _basename(__filename);

import Sequelize from 'sequelize';
import databaseConfig from "../../config/database";


import env from 'dotenv';
env.config();


const models = [];

function importDbModel(file) {

    let modelReq = require(file);

    if (typeof modelReq == "object" && typeof modelReq.default == "function") {

        let model = modelReq.default;

        models.push(model);

    }

}
function readDirModel(dirFolder) {

    readdirSync(dirFolder)
        .forEach(file => {

            if (fs.lstatSync(join(dirFolder, file)).isDirectory()) {

                readDirModel(join(dirFolder, file));

            } else if ((file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')) {

                importDbModel(join(dirFolder, file));

            }

        });

}

readDirModel(__dirname);



class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map((model) => model.init(this.connection))
            .map(
                (model) => model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();