const mongoose = require("mongoose");
const mongoUri =
  "mongodb+srv://robin:12345@cluster0.qqgnn.mongodb.net/smartnote?authSource=admin&replicaSet=atlas-33l1bk-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
const connectToMongo = () => {
  mongoose.connect(mongoUri, () => {
    console.log("MONGO CONNECTED");
  });
};
module.exports = connectToMongo;
