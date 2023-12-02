import express from "express";
import db from "./config/Databese.js";
import dotenv from "dotenv";
import cors from "cors";
// import Users from "./model/UserModel.js";
import router from "./routes/router.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

try {
    await db.authenticate();
    console.log('Database Connected...');
    // await Users.sync();
} catch (error) {
    console.error(error);
}

app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); // Fix the typo here
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5000, () => console.log('Server running at port 5000'));
