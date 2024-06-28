
class Frontcontrollers{
   
    static home = async(req,res)=> {
        try {
            res.render("home");
        } catch (error) {
            console.log(error)
        }
    }
    static about = async(req,res)=> {
        try {
            res.render("about");
        } catch (error) {
            console.log(error)
        }
    }
    static grivence = async(req,res)=> {
        try {
            res.render("grivence");
        } catch (error) {
            console.log(error)
        }
    }
    static benefit = async(req,res)=> {
        try {
            res.render("benefit");
        } catch (error) {
            console.log(error)
        }
    }
    static feature = async(req,res)=> {
        try {
            res.render("feature");
        } catch (error) {
            console.log(error)
        }
    }
    static help = async(req,res)=> {
        try {
            res.render("help");
        } catch (error) {
            console.log(error)
        }
    }

  
}
module.exports=Frontcontrollers;