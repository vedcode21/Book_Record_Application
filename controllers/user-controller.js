const { UserModel } = require("../models");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Users Found In The DB",
      });
    }
    res.status(200).json({
      success: true,
      message: "These are the user info: ",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single user by ID
exports.getSingleUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Doesn't Exist !!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User Found",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




exports.createNewUser = async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      sucess: false,
      message: "No Data To Add A user",
    });
  }
  await UserModel.create(data);
  const allUsers = await UserModel.find();

  return res.status(201).json({
    success: true,
    message: "Added User Succesfully",
    data: allUsers,
  });
};


// Update user data
exports.updateUserData = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: id },
      {
        $set: data,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User Doesn't Exist !!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User Updated !!",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Doesn't Exist !!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Deleted User..",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get subscription details by ID
exports.getSubscriptionDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User With The ID Didn't Exist",
      });
    }

    const getDateInDays = (data = "") => {
      let date;
      if (data === "") {
        date = new Date();
      } else {
        date = new Date(data);
      }
      let days = Math.floor(date / (1000 * 60 * 60 * 24));
      return days;
    };

    const subscriptionType = (date) => {
      if (user.subscriptionType === "Basic") {
        date = date + 90;
      } else if (user.subscriptionType === "Standard") {
        date = date + 180;
      } else if (user.subscriptionType === "Premium") {
        date = date + 365;
      }
      return date;
    };

    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
      ...user.toObject(),
      isSubscriptionExpired: subscriptionExpiration < currentDate,
      daysLeftForExpiration:
        subscriptionExpiration <= currentDate
          ? 0
          : subscriptionExpiration - currentDate,
      fine:
        returnDate < currentDate
          ? subscriptionExpiration <= currentDate
            ? 100
            : 50
          : 0,
    };

    return res.status(200).json({
      success: true,
      message: "Subscription detail for the user is: ",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
