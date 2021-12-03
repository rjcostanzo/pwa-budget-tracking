const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Name of Expense: "
  },
  value: {
    type: Number,
    required: "Amount: "
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
