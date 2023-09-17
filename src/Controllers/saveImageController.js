import { PrismaClient } from "@prisma/client";

const model = new PrismaClient();
const SaveImage = model.luu_anh;

export const checkSaveImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    const { userId } = req.user;

    const data = await SaveImage.findFirst({
      where: {
        nguoi_dung_id: userId,
        hinh_id: Number.parseInt(imageId),
      },
    });

    res.status(200).send(data ? true : false);
  } catch (e) {
    console.log(e);
    res.status(500).send("BE error");
  }
};

export const handleSaveImage = async (req, res) => {
  try {
    const { imageId } = req.body;
    const { userId } = req.user;

    if (!imageId) {
      res.status(400).send("Invalid information!");
      return;
    }

    const savedImage = await SaveImage.findFirst({
      where: {
        nguoi_dung_id: userId,
        hinh_id: Number.parseInt(imageId),
      },
    });

    // Save
    if (!savedImage) {
      await SaveImage.create({
        data: { nguoi_dung_id: userId, hinh_id: imageId, ngay_luu: new Date() },
      });
      res.status(201).send("Save successful!");
      return;
    }

    // Unsave
    await SaveImage.delete({
      where: {
        nguoi_dung_id_hinh_id: {
          hinh_id: Number.parseInt(imageId),
          nguoi_dung_id: Number.parseInt(userId),
        },
      },
    });
    res.status(201).send("Unsave successful!");
  } catch (e) {
    console.log(e);
    res.status(500).send("BE error");
  }
};

export const getSaveImages = async (req, res) => {
  try {
    const { userId } = req.user;
    const data = await SaveImage.findMany({
      where: {
        nguoi_dung_id: userId,
      },
      include: {
        hinh_anh: true,
      },
    });

    res.send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("BE error");
  }
};
