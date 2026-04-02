const User = require("../user.schema.js");

// async function getUserByEmail(email) {
//   try {
//     const user = await User.findOne({ email: email });
//     return user;
//   } catch (error) {
//     return error;
//   }
// }

// module.exports = getUserByEmail;

async function getUserByEmail(email) {
  try {
    // 1. Explicitly select +password
    // 2. Use .lean() to get a plain JS object (faster & easier to debug)
    const user = await User.findOne({ email }).select("+password").lean();
    return user;
  } catch (error) {
    // 3. THROW the error so the calling function's catch block handles it
    throw error;
  }
}

module.exports = getUserByEmail;
