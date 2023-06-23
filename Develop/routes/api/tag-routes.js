const router = require("express").Router();
const { Tag, Product, ProductTag, Category } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
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
  // find a single tag by its `id`
  // be sure to include its associated Product data
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
    .then((newTag) => {
      res.json(newTag);
    })
    .then(() => {
      res.json({ message: "New tag created" });
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
    .then((updatedTag) => {
      res.json(updatedTag);
    })
    .then(() => {
      res.json({ message: 'Tag Updated'});
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
    .then((deleteTag) => {
      res.json(deleteTag);
    })
    .then(() => {
      res.json({ message: "Tag Deleted"})
    })
    .catch((err) => res.json(err));
});



module.exports = router;
