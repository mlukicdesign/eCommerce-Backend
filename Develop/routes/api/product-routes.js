const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// get all products

router.get("/", (req, res) => {
  Product.findAll({
    include: [Tag],
    include: [Category], 
  })
    .then((products) => {
      res.json(products); 
    })
    .catch((error) => {
      console.log(error)
      res.json({ message: "failed to retrieve products" });
    });
});



// get one product

router.get("/:id", (req, res) => {
  Product.findByPk(req.params.id)
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log(err)
      res.json({ error: "failed to retrieve product" });
    });
});



// create new product
router.post("/", (req, res) => {
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400);
    });
});



// update product

router.put("/:id", (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        ProductTag.findAll({
          where: { product_id: req.params.id },
        }).then((productTags) => {
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "failed to update product"});
    });
});



// Delete Product

router.delete("/:id", (req, res) => {
  const productId = req.params.id;

  ProductTag.destroy({
    where: {
      product_id: productId,
    },
  })
    .then(() => {
      return Product.destroy({
        where: {
          id: productId,
        },
      });
    })
    .then((deletedProduct) => {
      res.json({ message: "Product deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: "Failed to delete product" });
    });
});



module.exports = router;
