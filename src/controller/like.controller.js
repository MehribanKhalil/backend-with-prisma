import prisma from "../config/db.js";

const likeProduct = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const userId = req.userId;

    if (!productId || !userId) {
      return res
        .status(400)
        .json({ message: "Product ID and User ID are required" });
    }

    const numericProductId = +productId;
    const numericUserId = +userId;

    const productExists = await prisma.product.findUnique({
      where: { id: numericProductId },
    });

    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    const userExists = await prisma.user.findUnique({
      where: { id: numericUserId },
    });

    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const productIsLiked = await prisma.like.findUnique({
      where: {
        userId_productId: {
          userId: numericUserId,
          productId: numericProductId,
        },
      },
    });

    let likeProduct;
    if (!productIsLiked) {
      likeProduct = await prisma.like.create({
        data: {
          userId: numericUserId,
          productId: numericProductId,
          isLike: true,
        },
      });
      return res
        .status(200)
        .json({ message: "Product liked", like: likeProduct });
    } else {
      likeProduct = await prisma.like.update({
        where: {
          userId_productId: {
            userId: numericUserId,
            productId: numericProductId,
          },
        },
        data: {
          isLike: !productIsLiked.isLike,
        },
      });
      return res
        .status(200)
        .json({ message: "Like status updated", like: likeProduct });
    }
  } catch (error) {
    next(error);
  }
};

export { likeProduct };
