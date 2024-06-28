const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema(
    
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },

    rollno: {
      type: Number,
      required: true,
    },

    phone: {
      type: Number,
      required: true,
    },
      image: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      token: {
        type: String,
      },
    },
    
     { timestamps: true }
  );
  const StudentModel = mongoose.model("student", StudentSchema);
  module.exports= StudentModel;