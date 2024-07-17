import prisma from "../config/db.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        Category: true,
      },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getByIdProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('mehi', id);
    const product = await prisma.product.findUnique({
      where: {
        id: +id,
      },
    });
    if (!product) return res.status(404).json({ message: "Not Found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { title, price, categoryId } = req.body;

    const product = await prisma.product.create({
      data: {
        title,
        price,
        categoryId,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await prisma.product.update({
      where: {
        id: +id,
      },
      data: {
        ...req.body,
      },
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findFirst({
      where: {
        id: +id,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const deletedProduct = await prisma.product.delete({
      where: {
        id: +id,
      },
    });
    if (!deleteProduct) res.status(404).json({ message: "Not Found" });
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductsByCategory = async (req, res) => {
    try {
      const { categoryName } = req.body;
      console.log('Category Name:', categoryName);
  
      const category = await prisma.category.findFirst({
        where: {
          categoryName: categoryName,
        },
      });
      console.log('Category:', category);
  
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      const productsByCat = await prisma.product.findMany({
        where: {
          categoryId: category.id,
        },
      });
      console.log('Products:', productsByCat);
  
      res.status(200).json(productsByCat);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  };
  

export {
  getAllProducts,
  getByIdProduct,
  getProductsByCategory,
  deleteProduct,
  createProduct,
  updateProduct,
};
