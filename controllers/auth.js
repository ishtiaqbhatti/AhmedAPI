const asyncHandler = require("../middleware/async");

const User = require("../models/User");

// @desc    Register User (Roles: employee, admin)
// @oute    POST /api/auth/register
// @access  Public

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { userName, password, role } = req.body;

  // Create user
  const user = await User.create({ userName, password, role });
  return res.status(200).json({
    success: 1,
    message: `User with role ${user.role} successfully created`
  });
});

// @desc      Login user
// @route     POST /api/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { userName, password } = req.body;

  // Validate emil & password
  if (!userName || !password) {
    return next(
      new ErrorResponse("Please provide an userName and password", 400)
    );
  }

  // Check for user
  const user = await User.findOne({
    $and: [{ userName }, { password }]
  });

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc      Log user out / clear cookie
// @route     GET /api/auth/logout
// @access    Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token
  });
};
