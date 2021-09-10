const express = require("express");
const app = express();
const userRouter = require("./Route/userRouter");
const dotenv = require("dotenv");
dotenv.config({
    path : "./Configuration/config.env"
});
const database = require("./Configuration/databaseConfiguration");

database()
    .then(()=>console.log("Connected To Database"))
    .catch(()=>console.log("Connection To Database Failed"));

app.use(express.json());
app.use("/api/v1",userRouter);


const PORT = 8000 || process.env.PORT;
app.listen(PORT,()=>console.log(`Server Started At PORT ${PORT}`));