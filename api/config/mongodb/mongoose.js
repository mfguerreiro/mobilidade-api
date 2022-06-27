import mongoose from 'mongoose';
import env from 'dotenv';
env.config();

const dbURI = process.env.MONGO_URL || 'mongodb+srv://pedenoapp:aUkBDb49hzhZh0F1@cluster0.zge9p.mongodb.net/Mobilidade?retryWrites=true&w=majority';
const mongoOption = {useNewUrlParser: true, useUnifiedTopology: true, server:{auto_reconnect:true}, useCreateIndex:true}

var db = mongoose.connection;

  db.on('connecting', function() {
    console.log('connecting to MongoDB...');
  });

  db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
  });
  db.on('connected', function() {
    console.log('MongoDB connected!');
  });
  db.once('open', function() {
    console.log('MongoDB connection opened!');
  });
  db.on('reconnected', function () {
    console.log('MongoDB reconnected!');
  });
  db.on('disconnected', function() {
    console.log('MongoDB disconnected!');
    mongoose.connect(dbURI, mongoOption);
  });
  mongoose.connect(dbURI, mongoOption);

  export default mongoose;

  /*
Model.deleteMany()
Model.deleteOne()
Model.find()
Model.findById()
Model.findByIdAndDelete()
Model.findByIdAndRemove()
Model.findByIdAndUpdate()
Model.findOne()
Model.findOneAndDelete()
Model.findOneAndRemove()
Model.findOneAndReplace()
Model.findOneAndUpdate()
Model.replaceOne()
Model.updateMany()
Model.updateOne()
*/