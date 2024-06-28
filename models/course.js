const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema(
    
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
 
     
      token: {
        type: String,
      },
    },
    
     { timestamps: true }
  );
  const courseModel = mongoose.model("course", courseSchema);
  module.exports= courseModel;