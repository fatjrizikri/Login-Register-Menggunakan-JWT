import Users from "../model/UserModel.js";
import bcrypt from "bcrypt";

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