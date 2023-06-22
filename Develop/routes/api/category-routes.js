const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// Find all categories

router.get("/", (req, res) => {
  Category.findAll({
    include: [Product], // Include the associated Products
  })
    .then((categories) => {
      res.json(categories); // Send the categories as a JSON response
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
      res.json(err);
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
      res.json(err);
    });
});


// delete a category by its `id` value

router.delete("/:id", (req, res) => {

  Category.destroy({
    where: {
      id: req.params.id,
    }
  })
.then((deleteCategory) => {
  res.json(deleteCategory);
})
.catch((err) => res.json(err));
});



module.exports = router;
