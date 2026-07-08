const User = require("../models/user");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Please Input all fields!" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }

    const saltRound = 10;

    const hashPassword = await bcrypt.hash(password, saltRound);

    const userObj = {
      firstName,
      lastName,
      email,
      password: hashPassword,
    };

    await User.create(userObj);
    return res.status(201).json({
      status: "true",
      message: "Account Created Successfully",
      user: {
        firstName,
        lastName,
        email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

module.exports = { register };
