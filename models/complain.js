const mongoose = require('mongoose')
const ComplainSchema = new mongoose.Schema(

    {
        complaintype: {
            type: String,
            required: true,
        },
        semester: {
            type: String,
            required: true,
        },
        course: {
            type: String,
            required: true,
        },
        rollno: {
            type: String,
            required: true,
        },
        complaindetail: {
            type: String,
            required: true,
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

const ComplainModel = mongoose.model("Complain", ComplainSchema);
module.exports = ComplainModel;

