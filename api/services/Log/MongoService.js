import { MongoClient } from 'mongodb';

const url =
  'mongodb+srv://pedenoapp:aUkBDb49hzhZh0F1@cluster0.zge9p.mongodb.net/Parameters?retryWrites=true&w=majority';

const client = new MongoClient(url);

(async () =>
  await client.connect({
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }))();

class MongoService {
  static async set(collection, data) {
    try {
      const dbo = client.db('Paremeters');

      return await dbo.collection(collection).insertOne(data);
    } catch (error) {
      console.error(error);
    }
  }

  static async get(collection) {
    try {
      const dbo = client.db('Paremeters');

      return await dbo.collection(collection).findOne(); //Parameter (Ex.: CityId) to filter parameters
    } catch (error) {
      console.error(error);
    }
  }
}

export default MongoService;
