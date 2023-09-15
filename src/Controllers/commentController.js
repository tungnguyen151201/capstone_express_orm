import { PrismaClient } from "@prisma/client";

const model = new PrismaClient();
const Comment = model.binh_luan;

export const createComment = async (req, res) => {
  try {
    const { userId, imageId, comment } = req.body;

    if (!userId || !imageId || !comment) {
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
