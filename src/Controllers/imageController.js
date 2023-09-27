import { PrismaClient } from '@prisma/client';

const model = new PrismaClient();
const Image = model.hinh_anh;

export const getAllImages = async (req, res) => {
  try {
    const data = await Image.findMany();

    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send('BE error');
  }
};

export const searchImages = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return getAllImages(req, res);
    }

    const data = await Image.findMany({
      where: {
        ten_hinh: {
          contains: keyword,
        },
      },
    });

    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send('BE error');
  }
};

export const getImageDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Image.findUnique({
      where: {
        hinh_id: Number.parseInt(id),
      },
      include: {
        nguoi_dung: {
          select: {
            email: true,
            ho_ten: true,
            tuoi: true,
            anh_dai_dien: true,
          },
        },
      },
    });

    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send('BE error');
  }
};

export const getImagesByUserId = async (req, res) => {
  try {
    const { userId } = req.user;
    const data = await Image.findMany({
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

export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    await Image.delete({
      where: {
        hinh_id: Number.parseInt(id),
      },
    });

    res.send('Delete successful!');
  } catch (e) {
    console.log(e);
    res.status(500).send('BE error');
  }
};

export const uploadImage = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      res.status(400).send('Invalid information!');
      return;
    }

    if (!req.file) {
      res.status(400).send('File empty!');
      return;
    }

    await Image.create({
      data: {
        ten_hinh: title,
        mo_ta: description,
        duong_dan: req.file.path,
        nguoi_dung_id: req.user.userId,
      },
    });
    res.send({
      message: 'Uploaded success!',
      path: req.file.path,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send('BE error');
  }
};
