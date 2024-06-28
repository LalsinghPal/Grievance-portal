const mongoose = require('mongoose')

const viewstatusSchema = new mongoose.Schema(
    
  {
    comment: {
      type: String,
      required: true,
    },
    status: {
        type: String,
        required: true,
      },
},
    
     { timestamps: true }
  );
  const viewstatusModel = mongoose.model("viewstatus", viewstatusSchema);
  module.exports= viewstatusModel;