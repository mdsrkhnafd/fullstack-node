const Task = require("../task.schema.js");
const { StatusCodes } = require("http-status-codes");
const { matchedData } = require("express-validator");
const errorLogger = require("../../helpers/errorLogger.helper.js");


async function handleDeleteTasks(req , res) {

    const validatedData = matchedData(req);
    
    try {

        const deletedTask = await Task.deleteOne({_id : validatedData["_id"]});
        return res.status(StatusCodes.OK).json(deletedTask);
        
    } catch (error) {
         errorLogger(`Error while deleting tasks:`, res, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: 'Unable to fetch tasks at the moment. Please try again later.',
    });
    }
}


module.exports = handleDeleteTasks;