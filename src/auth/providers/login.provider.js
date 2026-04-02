const { StatusCodes } = require("http-status-codes");
const { matchedData } = require("express-validator");
const errorLogger = require("../../helpers/errorLogger.helper.js");
const getUserByEmail = require("../../users/providers/getUserByEmail.provider.js");
const bcrypt = require("bcrypt");
const generateTokenProvider = require("./generateTokenProvider.js");

async function loginProvider(req, res) {
  const validatedData = matchedData(req);

  try {
    // get the user from the database
    const user = await getUserByEmail(validatedData.email);
    console.log("User found:", !!user);
    if (user) console.log("Password hash present:", !!user.password);

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "The email you provided does not exist.",
      });
    }

    // compare hashed password
    const isPasswordValid = await bcrypt.compare(
      validatedData.password,
      user?.password || "",
    );

    if (!isPasswordValid) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please check your credentials.",
      });
    }

    const token = generateTokenProvider(user);

    return res.status(StatusCodes.OK).json({
      accessToken: token,
      //   _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    errorLogger(`Error while trying to loggin :`, res, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to login at the moment. Please try again later.",
    });
  }
}

module.exports = loginProvider;

// async function loginProvider(req, res) {
//   const validatedData = matchedData(req);

//   console.log("REQ BODY =>", req.body);
//   console.log("VALIDATED DATA =>", validatedData);

//   try {
//     console.log("Before getUserByEmail");

//     const user = await getUserByEmail(validatedData.email);

//     console.log("USER =>", user);

//     if (!user) {
//       return res.status(StatusCodes.BAD_REQUEST).json({
//         message: "The email you provided does not exist.",
//       });
//     }

//     console.log("Before bcrypt compare");

//     const isPasswordValid = await bcrypt.compare(
//       validatedData.password,
//       user.password,
//     );

//     console.log("PASSWORD MATCH =>", isPasswordValid);

//     if (!isPasswordValid) {
//       return res.status(StatusCodes.BAD_REQUEST).json({
//         message: "Please check your credentials.",
//       });
//     }

//     console.log("Before token generation");

//     const token = generateTokenProvider(user);

//     console.log("TOKEN GENERATED");

//     return res.status(StatusCodes.OK).json({
//       accessToken: token,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//     });
//   } catch (error) {
//     console.log("LOGIN ERROR =>", error);

//     errorLogger(`Error while trying to loggin :`, res, error);

//     return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
//       reason: "Unable to login at the moment. Please try again later.",
//     });
//   }
// }

// module.exports = loginProvider;
