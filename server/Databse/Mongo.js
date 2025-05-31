const mongoose = require("mongoose");
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb connected");
  } catch (error) {
    console.log(error);
  }
};

mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb");
});
mongoose.connection.on("dissconnected", () => {
  console.log("mongo db is disconnected");
});

module.exports = connect;
