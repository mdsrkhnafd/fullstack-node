const Task = require("../task.schema.js");
const { StatusCodes } = require("http-status-codes");
const { matchedData } = require("express-validator");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function updateTaskProvider(req, res) {
  const validatedData = matchedData(req);

  try {

    // fetch task by ID
  const task = await Task.findById(req.body['_id']);
  // update task
    task.title = validatedData.title || task.title;
    task.description = validatedData.description || task.description;
    task.status = validatedData.status || task.status;
    task.priority = validatedData.priority || task.priority;
    task.dueDate = validatedData.dueDate || task.dueDate;
  // save updated task
   await task.save();

   return res.status(StatusCodes.OK).json(task);
    
  } catch (error) {
    errorLogger(`Error while updating tasks:`, res, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: 'Unable to fetch tasks at the moment. Please try again later.',
    });
  }

  
    
}

module.exports = updateTaskProvider;