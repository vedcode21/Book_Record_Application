const express = require("express");
const {
  getAllUsers,
  getSingleUserById,
  deleteUser,
  updateUserData,
  createNewUser,
  getSubscriptionDetailsById,
} = require("../controllers/user-controller");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getSingleUserById);
router.post("/", createNewUser);
router.put("/:id", updateUserData);
router.delete("/:id", deleteUser);
router.get("/subscription-details/:id", getSubscriptionDetailsById);

module.exports = router;
