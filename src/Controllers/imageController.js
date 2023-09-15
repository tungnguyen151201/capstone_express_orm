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
    res.status(500).send("BE error");
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
    res.status(500).send("BE error");
  }
};
