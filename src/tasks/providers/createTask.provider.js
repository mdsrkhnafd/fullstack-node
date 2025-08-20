const Task = require("../task.schema.js");
const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function createTaskProvider(req, res) {
  const validationResult = matchedData(req);
  const task = new Task({ ...validationResult , user: req.user.sub});
  console.log(req.user);
  

  try {
    await task.save();
    res.status(StatusCodes.CREATED).json(task);
  } catch (error) {
    errorLogger(`Error creating a new task : ${error.message}`, req, error);

    res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to create task at the moment. Please try again later.",
    });
  }
}

module.exports = createTaskProvider;
