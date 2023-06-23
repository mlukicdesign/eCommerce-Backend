const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  Category.findAll({
    include: [Product],
  })
    .then((categories) => {
      res.json(categories);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// find one category by its `id` value

router.get("/:id", (req, res) => {
  Category.findByPk(req.params.id)
    .then((categories) => {
      res.json(categories);
    })
    .catch((error) => {
      console.log(error);
      res.json({ error: "failed to retrieve category" });
    });
});

// Create New Category

router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Failed to create category" });
    });
});

// Update category by it's 'id'

router.put("/:id", (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updateCategory) => {
      res.json(updateCategory);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Failed to update category" });
    });
});

// delete a category by its `id` value

router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deleteCategory) => {
      res.json(deleteCategory);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Failed to delete category" });
    });
});

module.exports = router;
