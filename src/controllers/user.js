const envobj = require("../config/env");
const userResponse = require("../DTO/userResponse.dto");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    const saltRound = envobj.saltRound;

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
      user: userResponse(userObj),
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Please Input all fields!" });
    }

    const user = await User.findOne({ email });

    // console.log(userResponse(user));

    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.firstName },
      envobj.jwtSecret,
      { expiresIn: envobj.expireIn },
    );

    return res.status(200).json({
      status: true,
      message: "login successfully",
      user: userResponse(user),
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const authMe = async (req, res) => {
  try {
    const userDecode = req.user;
    console.log(userDecode);

    const user = await User.findById(userDecode.id);
    console.log(user);

    return res.status(200).json({
      status: true,
      message: "login successfully",
      user: userResponse(user),
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = { register, login, authMe };
