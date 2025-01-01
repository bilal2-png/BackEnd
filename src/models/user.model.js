import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import  jwt from "jsonwebtoken";

// Basic Syntax Work Here youtube user schema here

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: /^[a-zA-Z0-9]+$/,
            minlength: 3,
            maxlength: 20,
            trim: true,
            index: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 8,
            trim: true,

        },
        profileImage: {
            type: String, /// cloudinary url
            required: true
        },
        watchHistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        refreshToken:{
            type: String,
        }
    },
    {
        timestamps: true
    }
)

// before saving password hash(encrypt) the password.
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()  // if password is not modified, then return next() to avoid hashing the password again.
    this.password = await bcrypt.hash(this.password, 10)  // hash the password before saving to the database
   next()
})

//comparing the password for next login. checking if user enter the correct password.
UserSchema.methods.isPassworrdCorrect = async function(password)
{
   return await bcrypt.compare(password,this.password)
}

// generateAccessToken that will be saved in db.
UserSchema.methods.generateAccessToken = function(){
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

//same as above code
UserSchema.methods.generateRefreshToken = function(){
    jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",UserSchema)