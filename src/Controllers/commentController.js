import { PrismaClient } from "@prisma/client";

const model = new PrismaClient();
const Comment = model.binh_luan;

export const createComment = async (req, res) => {
  try {
    const { imageId, comment } = req.body;
    const { userId } = req.user;

    if (!imageId || !comment) {
      res.status(400).send("Invalid information!");
      return;
    }

    const data = {
      nguoi_dung_id: userId,
      hinh_id: imageId,
      ngay_binh_luan: new Date(),
      noi_dung: comment,
    };

    const created = await Comment.create({ data });
    res.status(201).send({ isSuccess: true, data: created });
  } catch (e) {
    console.log(e);
    res.status(500).send("BE error");
  }
};

export const getCommentsByImageId = async (req, res) => {
  try {
    const { imageId } = req.params;

    const data = await Comment.findMany({
      where: {
        hinh_id: Number.parseInt(imageId),
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
        hinh_anh: {
          select: {
            ten_hinh: true,
            duong_dan: true,
            mo_ta: true,
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
