const router = require("express").Router();
const Expense = require("../models/expense.js");

router.post("/api/expense", ({ body }, res) => {
  Expense.create(body)
    .then(dbExpense => {
      res.json(dbExpense);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/api/expense/multiple", ({ body }, res) => {
  Expense.insertMany(body)
    .then(dbExpense => {
      res.json(dbExpense);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/expense", (req, res) => {
  Expense.find({})
    .sort({ date: -1 })
    .then(dbExpense => {
      res.json(dbExpense);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
