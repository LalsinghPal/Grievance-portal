const courseModel = require("../../models/course")
const cloudinary = require("cloudinary");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



cloudinary.config({
    cloud_name: 'dx76klizp',
    api_key: '434245817557721',
    api_secret: 'iyHpuTUIumS1LcrQqn9sWZ2X2UA'
});

class courseController {
    

    static courseInsert = async (req, res) => {
        try {
           // console.log(req.body)
            const { name, email } = req.body;
            const result = new courseModel({
                name: name,
                email: email,
               
            })
            await result.save()
            res.redirect("/admin/course/display")
        } catch (error) {
            console.log(error);
        }
    };

    static courseDisplay = async (req, res) => {
        try {
            const {name, email,image} = req.data
            const data = await courseModel.find()
            //console.log(data)
            res.render("admin/course/display", { d: data,n:name, i:image, msg: req.flash('success') });
        } catch (error) {
            console.log(error)
        }
    }

    static courseView = async (req, res) => {
        try {
            const {name, email,image} = req.data
            // console.log(req.params.id)

            const data = await courseModel.findById(req.params.id)
            //console.log(data)

            res.render("admin/course/View", {  d: data, n:name,e:email,i:image  });
        } catch (error) {
            console.log(error)
        }
    }

    static courseEdit = async (req, res) => {
        try {
            const {name, email,image} = req.data
            
            const data = await courseModel.findById(req.params.id)
            //console.log(data)

            res.render("admin/course/edit", {  d: data,n:name , i:image });
        } catch (error) {
            console.log(error)
        }
    }

    static courseDelete = async (req, res) => {
        try {

            await courseModel.findByIdAndDelete(req.params.id)
            req.flash("success", "Course Delete Successfully");
            res.redirect('/admin/coursedisplay')
        } catch (error) {
            console.log(error)
        }
    }

    static courseUpdate = async (req,res) =>{
        try {
            //console.log(req.params.id)
            const { id } = req.data
            const { name, email } = req.body
            const Update = await courseModel.findByIdAndUpdate(req.params.id,{
                name: name,
                email: email,
                user_id: id

            })
            req.flash("success", "Course Update Successfully");
            res.redirect('admin/course/display')
        } catch (error) {
            console.log(error)
        }
    }


}
module.exports = courseController






