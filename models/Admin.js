const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema(
    
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
        type: String,
        required: true,
      },
    // conPassword: {
    //     type: String,
    //     required: true,
    //   },
    role: {
        type: String,
        default: 'admin'
    },
    image: {
        public_id: {
            type: String,
            required: true

        },

        url: {
            type: String,
            required: true

        }
    },
    
      
    },
    
     { timestamps: true }
  );
  const AdminModel = mongoose.model("Admin", AdminSchema);
  module.exports= AdminModel;