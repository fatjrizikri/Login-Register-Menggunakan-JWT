import Users from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const Register = async(req, res) => {
    const { name, email, number_phone, password, confPassword } = req.body;
    if (password !== confPassword ) {
        return res.status(400).json({
            status: "fail",
            message: "Password dan confrim password tidak sesuai"
        });
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            number: number_phone,
            password: hashPassword
        });
        return res.status(201).json({
            status: "success",
            message: "Register Berhasil"
        });
    } catch (error) {
        console.log(error);
    }
}

export const Login = async(req, res) => {
    try {
        const user =  await Users.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match){
            return res.status(400).json({
                status: "fail",
                message: "Password salah"
            });
        }
        // mengambil data user 
        const userId = user[0].id;
        const name =  user[0].name;
        const email = user[0].email;
        const number = user[0].number;
        const accessToken = jwt.sign({
            userId,
            name,
            email,
            number
         }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
         });
         const refreshToken = jwt.sign({
            userId,
            name,
            email,
            number
         }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
         });
         await Users.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
         });
         res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
            // secure: true //if use https
         });
         res.json({ accessToken });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "Email tidak ditemukan"
        });
    }
}