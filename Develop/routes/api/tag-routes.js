const router = require("express").Router();
const { Tag, Product, ProductTag, Category } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  Tag.findAll({
    include: [Product],
  })
    .then((tags) => {
      res.json(tags);
    })
    .catch((err) => {
      console.log(err);
      res.status({ error: "failed to retrieve tags" });
    });
});



router.get("/:id", (req, res) => {
  Tag.findByPk(req.params.id)
    .then((tags) => {
      res.json(tags);
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: "failed to retrieve tags " });
    });
});



router.post("/", (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then(() => {
      res.json({ message: "New tag created"});
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: "Failed to create new tag" });
    });
});



router.put("/:id", (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(() => {
      res.json({ message: "Tag Updated" });
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: "Failed to update tag" });
    });
});



router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.json({ message: "Tag Deleted" });
    })
    .catch((err) => res.json(err));
});

module.exports = router;
