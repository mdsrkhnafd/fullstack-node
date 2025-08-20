const Task = require("../task.schema.js");
const { StatusCodes } = require("http-status-codes");
const { matchedData } = require("express-validator");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function getTasksProvider(req, res) {
  const data = matchedData(req);

  try {
    const totalTasks = await Task.countDocuments();
    const currentPage = data.page ? data.page : 1;
    const limit = data.limit ? data.limit : 5; // Default limit to 10 if not provided
    const order = data.order ? data.order : "asc"; // Default order to 'asc' if not provided
    const totalPages = Math.ceil(totalTasks / limit);
    const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;
    const previousPage = currentPage === 1 ? currentPage : currentPage - 1;
    const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl.split("?")[0]}`;

    const tasks = await Task.find({
      status: {$in: ["todo" , "inProgress"] },
    })
      .limit(limit)
      .skip(currentPage - 1).sort({ createdAt: order === 'asc' ? 1 : -1 });

    let finalResponse = {
      data: tasks,
      pagination: {
        meta : {
          itemsPerPage: limit,
        totalItems: totalTasks,
        currentPage: currentPage,
        totalPages: totalPages,
        },
        links : {
          first : `${baseUrl}?limit=${limit}&page=${1}&order=${order}`,
          last : `${baseUrl}?limit=${limit}&page=${totalPages}&order=${order}`, 
          currentPage : `${baseUrl}?limit=${limit}&page=${currentPage}&order=${order}`,
          nextPage : `${baseUrl}?limit=${limit}&page=${nextPage}&order=${order}`,
          previousPage : `${baseUrl}?limit=${limit}&page=${previousPage}&order=${order}`,
        }
      },
    
    }  

    return res.status(StatusCodes.OK).json(finalResponse);
  } catch (error) {
    errorLogger(`Error while fetching tasks:`, res, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to fetch tasks at the moment. Please try again later.",
    });
  }
}

module.exports = getTasksProvider;
