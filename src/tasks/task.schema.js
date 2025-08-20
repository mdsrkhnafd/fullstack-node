const { Schema , model} = require("mongoose");

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Task description is required"],
      trim: true,
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    status: {
      type: String,
      required: [true, "Task status is required"],
      enum: ["todo", "inProgress", "completed"],
      default: "todo",
    },
    priority: {
      type: String,
      required: [true, "Task priority is required"],
      enum: ["low", "normal", "high"],
      default: "normal",
    },
    dueDate: {
      type: Date,
      required: [true, "Task due date is required"],
    },
    user : {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


const Task = model("Task", taskSchema);

module.exports = Task;


/**
 * @swagger
 * 
 * components:
 *  schemas:
 *   Task:
 *    type: object
 *    required:
 *      - title
 *      - description
 *      - status
 *      - priority
 *      - dueDate
 *    properties:
 *      title:
 *        type: string
 *        description: The title of the task
 *        maxLength: 100
 *      description:
 *        type: string
 *        description: The description of the task
 *        maxLength: 500
 *      status:
 *        type: string
 *        description: The status of the task
 *        enum: ["todo" , "inProgress" , "completed"]
 *      priority:
 *        type: string
 *        description: The priority of the task
 *        enum: ["low" , "normal" , "high"]
 *      dueDate:
 *        type: string
 *        format: ISO8601 Date string
 *        description: The due date for the task
 *    example:
 *      title: "Task title"
 *      description: "Task description"
 *      status: "todo"
 *      priority: "normal"
 *      dueDate: "2025-01-01T12:00:00Z"
 *        
 * */  


/**
 * @swagger
 * 
 * components:
 *  schemas:
 *   TaskUpdate:
 *    type: object
 *    required:
 *      - _id
 *    properties:
 *      _id:
 *        type: string
 *        description: The MongoDB ObjectId of the task
 *        format: ObjectId
 *      title:
 *        type: string
 *        description: The title of the task
 *        maxLength: 100
 *      description:
 *        type: string
 *        description: The description of the task
 *        maxLength: 500
 *      status:
 *        type: string
 *        description: The status of the task
 *        enum: ["todo" , "inProgress" , "completed"]
 *      priority:
 *        type: string
 *        description: The priority of the task
 *        enum: ["low" , "normal" , "high"]
 *      dueDate:
 *        type: string
 *        format: ISO8601 Date string
 *        description: The due date for the task
 *    example:
 *      _id: "123456789012345678901234"
 *      title: "Task title"
 *      description: "Task description"
 *      status: "todo"
 *      priority: "normal"
 *      dueDate: "2025-01-01T12:00:00Z"
 *        
 * */  

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *   TaskDelete:
 *    type: object
 *    required:
 *      - _id
 *    properties:
 *      _id:
 *        type: string
 *        description: The MongoDB ObjectId of the task
 *        format: ObjectId
 *    example:
 *      _id: "123456789012345678901234"
 *        
 * */  