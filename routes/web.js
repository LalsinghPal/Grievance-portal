const express = require("express");
const Frontcontrollers = require("../controllers/Frontcontrollers")
const Admincontrollers = require("../controllers/admin/Admincontrollers");
const StudentController = require("../controllers/admin/StudentController");
const courseController = require("../controllers/admin/coursecontroller");
const checkAdminAuth = require("../Middleware/auth");
const checkStuAuth = require("../Middleware/studentauth");


const route = express.Router();

//route localhost:4000

route.get("/", Frontcontrollers.home)
route.get("/about", Frontcontrollers.about)
route.get("/grivence", Frontcontrollers.grivence)
route.get("/benefit", Frontcontrollers.benefit)
route.get("/feature", Frontcontrollers.feature)
route.get("/help", Frontcontrollers.help)




//adminpart
route.get("/admin/dashboard",checkAdminAuth, Admincontrollers.dashboard)
route.get("/admin/register", Admincontrollers.register)
route.post("/Admininsert", Admincontrollers.AdminInsert)
route.post("/admin/verifyLogin", Admincontrollers.verifyLogin)
route.get("/profile",checkAdminAuth, Admincontrollers.profile)
route.post("/changePassword",checkAdminAuth, Admincontrollers.changePassword)
route.post('/updateProfile',checkAdminAuth,Admincontrollers.updateProfile)
route.post("/admin/updatestatus/:id",checkAdminAuth,Admincontrollers.updatestatus)









//admin student insert
route.post("/admin/studentInsert",checkStuAuth, StudentController.StudentInsert)
route.get("/admin/studentdisplay",checkStuAuth, StudentController.StudentDisplay)
route.get("/admin/Student/View/:id",checkStuAuth, StudentController.StudentView)
route.get("/admin/Student/Edit/:id",checkStuAuth, StudentController.StudentEdit)
route.get("/admin/Student/Delete/:id",checkStuAuth, StudentController.studentDelete)
route.post("/admin/studentUpdate:id", StudentController.studentUpdate)
route.post("/verifyLogin", StudentController.verifyLogin)
route.get("/logout", StudentController.logout)
route.get("/studentdashboard",checkStuAuth, StudentController.StudentDashboard)
route.post("/studentdashboard/updateprofile",checkStuAuth, StudentController.updateProfile)
route.post("/studentdashboard/changePassword",checkStuAuth, StudentController.changePassword)
route.post("/complain", StudentController.Complain)
route.get("/complaindisplay", StudentController.complaindisplay)









//admin course insert
route.post("/admin/courseInsert",checkAdminAuth, courseController.courseInsert)
route.get("/admin/coursedisplay",checkAdminAuth, courseController.courseDisplay)
route.get("/admin/course/View/:id",checkAdminAuth, courseController.courseView)
route.get("/admin/course/Edit/:id",checkAdminAuth, courseController.courseEdit)
route.get("/admin/course/Delete/:id",checkAdminAuth, courseController.courseDelete)
route.post("/admin/courseupdate/:id",checkAdminAuth,courseController.courseUpdate)









module.exports = route;