import express from "express";
import db from "./config/Databese.js";
// import Users from "./model/UserModel.js";
import router from "./routes/router.js";
const app = express();
try {
    await db.authenticate();
    console.log('Database Connected...');
    // await Users.sync();
} catch (error) {
    console.error(error);
}
app.use(express.json());
app.use(router);
app.listen(5000, () => console.log ('server running at port 5000'));