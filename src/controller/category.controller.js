import prisma from "../config/db.js";

const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: {
        id: +id,
      },
    });
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const category = await prisma.category.create({
      data: {
        categoryName,
      },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;

    const updatedCategory = await prisma.category.update({
      where: {
        id: +id,
      },
      data: {
        categoryName,
      },
    });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: {
        id: +id,
      },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const deletedCategory = await prisma.category.delete({
      where: {
        id: +id,
      },
    });
    res.status(200).json(deletedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
