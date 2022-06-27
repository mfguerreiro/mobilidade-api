import client from '../../config/mongodb'
import moment from 'moment-timezone';


class LogService {

    static async logAdd(id, type, body, login) {

        try {


                var dbo = client.db("ErrorLog");

                let agora = moment().tz('America/Sao_Paulo').format();
                let today = moment().tz('America/Sao_Paulo').format("YYYYMMDD");


                dbo.collection("Q2").insertOne({
                    type: type,
                    date: agora,
                    body: body,
                    login: login,
                    day: today,
                    idProvider: parseInt(id)
                });


        } catch (err) {

            console.error(err);

        }

    }

    static async cleanLog() {

        try {


                var dbo = client.db("ErrorLog");

                let lastWeek = moment().tz('America/Sao_Paulo').subtract(8, "days").format();
                let lastWeekMongo = moment().tz('America/Sao_Paulo').subtract(8, "days").toISOString(true);

                console.log(lastWeek);
                console.log(lastWeekMongo);
                
                let ret = await dbo.collection("Q2").deleteMany({date:{$lte:lastWeek}});

                console.log(ret.deletedCount);

                




        } catch (err) {

            console.error(err);

        }

    }    

    

}

export default LogService;