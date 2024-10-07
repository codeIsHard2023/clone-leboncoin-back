import express from "express";
import { Category } from "../../db/entities/Category";
import { validate } from "class-validator";

export const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
});

router.get("/:id", async (req, res) => {
  try {
    const id: number = parseInt(req.params.id);
    const category = await Category.findOneBy({ id });

    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id/ads", async (req, res) => {
  const id = parseInt(req.params.id);
  const ads = await Category.find({
    relations: {
      ads: true,
    },
    where: {
      id,
    },
  });

  res.json(ads);
});

router.post("/", async (req, res) => {
  try {
    const newCategory = new Category();
    newCategory.name = req.body.name;

    const errors = await validate(newCategory);

    if (errors.length) {
      res.status(400).json(errors);
    } else {
      await newCategory.save();
      console.log(newCategory);
      res
        .status(200)
        .json({ message: "New category added", id: newCategory.id });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id: number = parseInt(req.params.id);
    const categoryToUpdate = await Category.findOneBy({ id });

    if (categoryToUpdate) {
      Object.assign(categoryToUpdate, req.body);

      const errors = await validate(categoryToUpdate);

      if (errors.length) {
        res.status(400).json(errors);
      } else {
        categoryToUpdate.save();
        res.status(200).json({ message: "Category updade is succesfull" });
      }
    } else {
      res.status(404).json({ message: "Category updade is failed" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id: number = parseInt(req.params.id);
    const categoryToDelete = await Category.findOneBy({ id });

    if (categoryToDelete) {
      await categoryToDelete.remove();
      res.status(200).json({ message: "Category delete is succesfull" });
    } else {
      res.status(404).json({ message: "Category delete is failed" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
