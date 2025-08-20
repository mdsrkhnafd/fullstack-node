const User = require("../user.schema.js");
const {matchedData} = require("express-validator");
const {StatusCodes} = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");
const bcrypt = require("bcrypt");
const getUserByEmail = require("./getUserByEmail.provider.js");

async function createUserProvider(req , res) {

    const validatedData = matchedData(req);
    
    
    try {

        const existingUser = await getUserByEmail(validatedData.email);
        if (existingUser) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "User with this email already exists",
            });
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(validatedData.password, salt); 

        const user = new User({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        password: hashedPassword,
    });

    await user.save();

    return res.status(StatusCodes.CREATED).json({
        _id : user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    });
        
    } catch (error) {
         errorLogger(`Error creating a new user : ${error.message}`, req, error);

        res.status(StatusCodes.GATEWAY_TIMEOUT).json({
            reason : "Unable to create task at the moment. Please try again later." 
        });
    }
}

module.exports = createUserProvider;