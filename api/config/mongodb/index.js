import {
    MongoClient
} from 'mongodb';

import env from 'dotenv';
env.config();

const url = process.env.MONGOLOG_URL || 'mongodb+srv://pedenoapp:aUkBDb49hzhZh0F1@cluster0.zge9p.mongodb.net/MobilidadeLog?retryWrites=true&w=majority';

const client = new MongoClient(url);

(async () => await client.connect({
    useNewUrlParser: true,
    useUnifiedTopology: true
  }))();

export default client;
