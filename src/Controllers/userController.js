import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const model = new PrismaClient();
const User = model.nguoi_dung;

export const getUser = (req, res) => {
  res.send("Get user");
};

export const signUp = async (req, res) => {
  try {
    const { email, password, fullName, age } = req.body;

    if (!email || !password || !fullName || !age) {
      res.status(400).send("Invalid information!");
    }
    const checkEmail = await User.findMany({ where: { email } });

    if (checkEmail.length > 0) {
      res.status(400).send("Email existed!");
    }

    const newUser = {
      email,
      ho_ten: fullName,
      tuoi: age,
      mat_khau: bcrypt.hashSync(password, 10),
    };

    await User.create({ data: newUser });
    res.status(201).send("Signed up successful!");
  } catch (e) {
    console.log(e);
    res.status(500).send("BE error");
  }
};
