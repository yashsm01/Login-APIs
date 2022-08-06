const express = require("express");
const router = express.Router();
const loginControl = require("../controll/loginControl");
const upload = require("../middleware/upload");

router.get("/show",loginControl.index);
router.post("/Login",loginControl.authLogin);
router.post("/user",loginControl.userProfile);
router.post("/Registor",upload.single('Image'),loginControl.store);    

module.exports = router;
