const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        Name: {
            type: String,
            required: true,
            trim: true,
        },
        Email: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
            required: true,
        },
        Password: {
            type: String,
            trim: true,
            minlength: 6,
            required: true,
        },
        Role: {
            type: String,
            enum: ["user", "admin"],
            required: true,
            default: "user",
        },
        Phone: {
            type: String,
        },
        ProfileImage: {
            type: String,
        },
        RefreshToken: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = {
    User,
};
