const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({

   email: {type: String,required: true,unique: true,lowercase: true},
   password: {type: String,required: true},

    role: {
        type: String,
        enum: ["SUPER_ADMIN", "WAREHOUSE_MANAGER", "SALES_MANAGER", "DELIVERY_MANAGER"],
        default: "SUPER_ADMIN"
    },

    isActive: {
        type: Boolean,
        default: true
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);