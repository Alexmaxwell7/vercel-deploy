const express = require("express");
const router = express.Router();
const itemController = require("../controller/itemController");
router.post("/insertuser", itemController.insertItem);
router.get("/getusers", itemController.getItems);
router.get("/getuser/:id", itemController.getOneItem);
router.put("/updateuser/:id", itemController.updateItem);
router.delete("/deleteuser/:id", itemController.deleteItem);
module.exports = router;
