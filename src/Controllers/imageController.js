import { PrismaClient } from "@prisma/client";

const model = new PrismaClient();
const Image = model.hinh_anh;

export const getAllImages = async (req, res) => {
  try {
    const data = await Image.findMany();

    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("BE error");
  }
};

export const searchImages = async (req, res) => {
  try {
    const { key } = req.query;

    if (!key) {
      return getAllImages(req, res);
    }

    const data = await Image.findMany({
      where: {
        ten_hinh: {
          contains: key,
        },
      },
    });

    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("BE error");
  }
};
