const StudentModel = require("../../models/student")
const courseModel = require("../../models/course")
const cloudinary = require("cloudinary");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ComplainModel = require("../../models/complain")
const viewstatusModel = require("../../models/viewstatus")




cloudinary.config({
    cloud_name: 'dx76klizp',
    api_key: '434245817557721',
    api_secret: 'iyHpuTUIumS1LcrQqn9sWZ2X2UA'
});


class StudentController {
    

    static StudentInsert = async (req, res) => {
        
        try {
            //console.log(req.files.image)
            const file = req.files.image
            //image upload cloudinary
            const imageUploaded = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "studentimage",
            });

            //console.log(imageUploaded)

            const { name, email, phone, dob ,password,city,course,rollno,address} = req.body
            const user = await StudentModel.findOne({ email: email })
            //console.log(user)
            if (user) {
                req.flash("error", "Email already exists.");
                res.redirect("/admin/student/display");
            } else {
                if (name && email && phone) {
                   
                        const hashpassword = await bcrypt.hash(password, 10)
                        const result = new StudentModel({
                            name: name,
                            email: email,
                            phone: phone,
                            dob: dob,
                            password: hashpassword,
                            city: city,
                            course: course,
                            address:address,
                            rollno: rollno,
                            image: {
                                public_id: imageUploaded.public_id,
                                url: imageUploaded.secure_url,
                            },
                        })
                        await result.save()
                        req.flash("success", "Register success! Plz login");
                        res.redirect('/admin/student/display')  //url

                    
                } else {
                    req.flash("error", "All fields are required.");
                    res.redirect("/admin/student/display");
                }
            }

        } catch (error) {
            console.log(error);
        }
    };

    static StudentDisplay = async (req, res) => {
        try {
            const {name,image} = req.data
            const data = await StudentModel.find()
            const course = await courseModel.find()
            
            //console.log(data)
            res.render("admin/student/display", { course:course, d: data,n:name,i:image, msg: req.flash('success') });
        } catch (error) {
            console.log(error)
        }
    }

    static StudentView = async (req, res) => {
        try {
            const {name, email,image} = req.data
            // console.log(req.params.id)

            const data = await StudentModel.findById(req.params.id)
            //console.log(data)

            res.render("admin/Student/View", {  d: data,n:name,e:email,i:image });
        } catch (error) {
            console.log(error)
        }
    }

    static StudentEdit = async (req, res) => {
        try {
            const {name, email,image} = req.data
            
            const data = await StudentModel.findById(req.params.id)
            //console.log(data)

            res.render("admin/Student/Edit", {  d: data,n:name ,i:image , e:email });
        } catch (error) {
            console.log(error)
        }
    }

    static studentDelete = async (req, res) => {
        try {

            await StudentModel.findByIdAndDelete(req.params.id)
            req.flash("success", "Course Delete Successfully");
            res.redirect('/admin/studentdisplay')
        } catch (error) {
            console.log(error)
        }
    }

    static studentUpdate = async (req,res) =>{
        try {
            //console.log(req.params.id)
            const { id } = req.data
            const { name, email, phone, dob, address,  } = req.body
            const Update = await StudentModel.findByIdAndUpdate(req.params.id,{
                name: name,
                email: email,
                phone: phone,
                dob: dob,
                address: address,
                user_id: id

            })
            req.flash("success", "Course Update Successfully");
            res.redirect('/admin/studentdisplay')
        } catch (error) {
            console.log(error)
        }
    }

    static verifyLogin = async (req, res) => {
        try {
            //console.log(req.body)
            const { email, password } = req.body;
            //console.log(req.body)
            const user = await StudentModel.findOne({ email: email });
            //console.log(user)
            if (user != null) {
                const ismatch = await bcrypt.compare(password, user.password)
                //console.log(ismatch)
                if (ismatch) {
                    //token
                    const token = jwt.sign({ ID: user._id}, 'pninfosys@496ghjk');
                    //console.log(token)
                    res.cookie('token',token)
                    res.redirect('/studentdashboard')
                } else {
                    req.flash("error", "Email or  password is not valid.");
                    res.redirect("/")
                }

            } else {
                req.flash("error", "you are not a registered user.");
                res.redirect("/")
            }

        } catch (error) {
            console.log(error)
        }
    }
    static logout = async (req,res) =>{
        try {
            res.clearCookie("token");
            res.redirect('/')
        } catch (error) {
            console.log(error);
        }
    };

    static StudentDashboard = async(req,res)=> {
        try {
            const {name,email,image,rollno,phone} =req.studentdata
            const data = await StudentModel.find()

            res.render("studentdashboard",{d:data , name:name, email:email, image:image, rollno:rollno ,phone:phone });
        } catch (error) {
            console.log(error)
        }
    }

    static updateProfile = async (req, res) => {
        try {
          const { id } = req.studentdata;
          const { name, email } = req.body;
          if (req.files) {
            const user = await StudentModel.findById(id);
            const imageID = user.image.public_id;
            console.log(imageID);
    
            //deleting image from Cloudinary
            await cloudinary.uploader.destroy(imageID);
            //new image update
            const imagefile = req.files.image;
            const imageupload = await cloudinary.uploader.upload(
              imagefile.tempFilePath,
              {
                folder: "studentprofile",
              }
            );
            var studentdata = {
              name: name,
              email: email,
              image: {
                public_id: imageupload.public_id,
                url: imageupload.secure_url,
              },
            };
          } else {
            var studentdata = {
              name: name,
              email: email,
            };
          }
          await StudentModel.findByIdAndUpdate(id, studentdata);
          req.flash("success", "Update Profile successfully");
          res.redirect("/");
        } catch (error) {StudentDashboard
          console.log(error);
        }
      };

      static changePassword = async (req, res) => {
        try {
          const { id } = req.studentdata;
          //console.log(req.body)
          const { op, np, cp } = req.body;
          if (op && np && cp) {
            const user = await StudentModel.findById(id);
            const isMatched = await bcrypt.compare(op, user.password);
            //console.log(isMatched)
            if (!isMatched) {
              req.flash("error", "Current password is incorrect ");
              res.redirect("/StudentDashboard");
            } else {
              if (np != cp) {
                req.flash("error", "Password does not match");
                res.redirect("/StudentDashboard");
              } else {
                const newHashPassword = await bcrypt.hash(np, 10);
                await StudentModel.findByIdAndUpdate(id, {
                  password: newHashPassword,
                });
                req.flash("success", "Password Updated successfully ");
                res.redirect("/StudentDashboard");
              }
            }
          } else {
            req.flash("error", "ALL fields are required ");
            res.redirect("/StudentDashboard");
          }
        } catch (error) {
          console.log(error);
        }
      };

     static Complain = async (req,res) =>{
        try {

             //console.log(req.files.image)
            const file = req.files.image
            // image upload cloudinary
             const imageUploaded = await cloudinary.uploader.upload(file.tempFilePath, {
                 folder: "complainimage",
             });
 
             //console.log(imageUploaded)
           // console.log(req.body)

           const{complaintype,semester,course,rollno,complaindetail,image} = req.body
           const Complain = new ComplainModel({
            complaintype:complaintype,
            semester:semester,
            course:course,
            rollno:rollno,
            complaindetail:complaindetail,
            image:{
                public_id: imageUploaded.public_id,
                url: imageUploaded.secure_url,
            },
           })
           await Complain.save()
           req.flash("success","Complaint register successfully")
           res.redirect('/Studentdashboard')
        } catch (error) {
           console.log(error) 
        }
     } 

     static complaindisplay = async(req,res)=>{
        try {
            // const{image}=req.studentdata
            const data = await ComplainModel.find()
           res.render("complain",{d:data}) 
        } catch (error) {
            console.log(error)
        }
     }

    



      

   



    






}
module.exports = StudentController






