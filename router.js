const express = require("express");
const router = new express.Router();
const Item = require('../item');

router.get('', (req, res, next) => {
    try {
      return res.json({ items: Item.findAll() });
    } catch(err){
      return next(err)
    }
  });

  router.post('', (req, res, next) => {
    try {
      let newItem = new Item(req.body.name, req.body.price);
      return res.json({item: newItem});
    } catch (err) {
      return next(err)
    }
  });

  router.get('/:name', (req, res, next) => {
    try {
        let foundItem = Item.find(req.params.name);
        return res.json({item:foundItem})
    } catch(e) {
        return next(e)
    }
  });

  router.patch(':name', (req, res, next) => {
    try {
        let foundItem = Item.update(req.params.name, req.body);
        return res.json({ item: foundItem });
      } catch (err) {
        return next(err)
      }
  });

  router.delete(':name', (req, res, next) => {
    try {
        let foundItem = Item.remove(req.params.name);
        return res.json({ message: "Deleted" });
      } catch (err) {
        return next(err)
      }
  });

  module.exports = router;