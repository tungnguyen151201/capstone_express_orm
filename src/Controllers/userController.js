import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { createToken } from '../Config/jwtConfig.js';

const model = new PrismaClient();
const User = model.nguoi_dung;

export const signUp = async (req, res) => {
  try {
    const { email, password, fullName, age } = req.body;

    if (!email || !password || !fullName || !age) {
      res.status(400).send('Invalid information!');
      return;
    }

    const checkEmail = await User.findMany({ where: { email } });
    if (checkEmail.length > 0) {
      res.status(400).send('Email existed!');
      return;
    }

    const newUser = {
      email,
      ho_ten: fullName,
      tuoi: age,
      mat_khau: bcrypt.hashSync(password, 10),
    };

    await User.create({ data: newUser });
    res.status(201).send('Signed up successful!');
  } catch (e) {
    console.log(e);
    res.status(500).send('BE error');
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send('Invalid information!');
      return;
    }

    const checkEmail = await User.findFirst({ where: { email } });
    if (!checkEmail) {
      res.status(404).send('Email not existed!');
      return;
    }

    const checkPass = bcrypt.compareSync(password, checkEmail.mat_khau);
    if (!checkPass) {
      res.status(404).send('Invalid password!');
      return;
    }

    const token = createToken({
      userId: checkEmail.nguoi_dung_id,
      email: checkEmail.email,
    });

    res.status(200).send(token);
  } catch (e) {
    console.log(e);
    res.status(500).send('BE error');
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const data = await User.findUnique({
      select: {
        email: true,
        ho_ten: true,
        tuoi: true,
        anh_dai_dien: true,
      },
      where: {
        nguoi_dung_id: userId,
      },
    });

    res.send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send('BE error');
  }
};

export const editProfile = async (req, res) => {
  try {
    const { fullName, age } = req.body;
    if (!fullName || !age) {
      res.status(400).send('Invalid information!');
      return;
    }

    if (!req.file) {
      res.status(400).send('File empty!');
      return;
    }

    const data = await User.update({
      select: {
        email: true,
        ho_ten: true,
        tuoi: true,
        anh_dai_dien: true,
      },
      where: {
        nguoi_dung_id: req.user.userId,
      },
      data: {
        ho_ten: fullName,
        tuoi: Number.parseInt(age),
        anh_dai_dien: req.file.path,
      },
    });
    res.send({
      message: 'Edited profile success!',
      data,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send('BE error');
  }
};
