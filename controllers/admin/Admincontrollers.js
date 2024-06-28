const AdminModel = require('../../models/Admin')
const cloudinary = require("cloudinary");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

cloudinary.config({
  cloud_name: 'dx76klizp',
  api_key: '434245817557721',
  api_secret: 'iyHpuTUIumS1LcrQqn9sWZ2X2UA'
});

class Admincontrollers {
  static dashboard = async (req, res) => {
    try {
      const { name, email, image } = req.data
      res.render("admin/dashboard", { n: name, i: image })
    } catch (error) {
      console.log(error);
    }
  }

  static register = async (req, res) => {
    try {
      res.render("admin/register")
    } catch (error) {
      console.log(error)
    }
  }


  static AdminInsert = async (req, res) => {
    try {
      const file = req.files.image
      //image upload cloudinary
      const imageUploaded = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "Adminimage",
      });
      //console.log(req.body)
      const { name, email, password, } = req.body;
      const hashpassword = await bcrypt.hash(password, 10)
      const result = new AdminModel({
        name: name,
        email: email,
        password: hashpassword,
        image: {
          public_id: imageUploaded.public_id,
          url: imageUploaded.secure_url,
        },


      })
      await result.save()
      res.redirect("/")
    } catch (error) {
      console.log(error);
    }
  };

  static verifyLogin = async (req, res) => {
    try {
      const { email, password } = req.body
      if (email && password) {
        const admin = await AdminModel.findOne({ email: email })
        //console.log(admin)
        // password check
        if (admin != null) {
          const isMatched = await bcrypt.compare(password, admin.password)
          if (isMatched) {
            const token = jwt.sign({ ID: admin.id }, "pninfosys@496ghjk")
            res.cookie("token", token)
            //console.log(token)
            res.redirect("/admin/dashboard")
          }
          else {
            res.redirect('/')
          }
        }


      } else {
        res.redirect('/')

      }
    } catch (error) {
      console.log(error)
    }
  }

  static profile = async (req, res) => {
    try {
      const { name, email, image } = req.data
      res.render("admin/profile", { n: name, i: image, e: email });
    } catch (error) {
      console.log(error);
    }
  };

  static changePassword = async (req, res) => {
    try {
      const { id } = req.data;
      //console.log(req.body)
      const { op, np, cp } = req.body;
      if (op && np && cp) {
        const user = await AdminModel.findById(id);
        const isMatched = await bcrypt.compare(op, user.password);
        //console.log(isMatched)
        if (!isMatched) {
          req.flash("error", "Current password is incorrect ");
          res.redirect("/profile");
        } else {
          if (np != cp) {
            req.flash("error", "Password does not match");
            res.redirect("/profile");
          } else {
            const newHashPassword = await bcrypt.hash(np, 10);
            await AdminModel.findByIdAndUpdate(id, {
              password: newHashPassword,
            });
            req.flash("success", "Password Updated successfully ");
            res.redirect("/");
          }
        }
      } else {
        req.flash("error", "ALL fields are required ");
        res.redirect("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static updateProfile = async (req, res) => {
    try {
      const { id } = req.data;
      const { name, email } = req.body;
      if (req.files) {
        const user = await AdminModel.findById(id);
        const imageID = user.image.public_id;
        console.log(imageID);

        //deleting image from Cloudinary
        await cloudinary.uploader.destroy(imageID);
        //new image update
        const imagefile = req.files.image;
        const imageupload = await cloudinary.uploader.upload(
          imagefile.tempFilePath,
          {
            folder: "Adminprofile",
          }
        );
        var data = {
          name: name,
          email: email,
          image: {
            public_id: imageupload.public_id,
            url: imageupload.secure_url,
          },
        };
      } else {
        var data = {
          name: name,
          email: email,
        };
      }
      await AdminModel.findByIdAndUpdate(id, data);
      req.flash("success", "Update Profile successfully");
      res.redirect("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  static updatestatus = async (req, res) => {
    try {
      //console.log(req.body)
      const update = await AdminModel.findByIdAndUpdate(req.params.id, {
        status: req.body.status,
        comment: req.body.comment
      })
      req.flash("success", "update profile successfully")
      res.redirect('/')
    } catch (error) {
     console.log(error)
    }
  }








}

module.exports = Admincontrollers;