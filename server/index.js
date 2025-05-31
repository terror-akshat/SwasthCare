const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connect = require("./Databse/Mongo.js");
const ApiRoute = require("./Routes/route.js");
const wardRoute = require("./Routes/ward.js");
const ipdRoute = require("./Routes/ipdRoute.js");
const { verifyToken } = require("./verifyAuth.js");
const Upload = require("./Routes/upload.js");
const billRoute = require("./Routes/billingRoute.js");
const path = require("path");
// const { cloudinary } = require("./cloudnary/cloudnary.js");
const app = express();
require("dotenv").config();
app.use(
  cors({
    origin: [
      //process.env.FRONTEND_URL,
      // "https://fascinating-hotteok-92d1f6.netlify.app"
      // "https://superb-fudge-68605f.netlify.app",
      // "https://glittery-snickerdoodle-abbd22.netlify.app",
      //  "https://samreen-hospital.vercel.app",
      "http://localhost:5173",
      "https://amazing-stroopwafel-591a17.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth/", ApiRoute);
app.use("/api/ward/", verifyToken, wardRoute);
app.use("/api/ipd/", ipdRoute);
app.use("/api/uploads", Upload);
app.use("/api/bill", billRoute);

connect();

app.listen(process.env.PORT, () => {
  console.log(`Server is started at${process.env.PORT}`);
});
