import asyncHandler from "../utils/asyncHandler.js";
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    //get user details from frontend
    //validating of email and password
    //create user object in db
    //check for user creation in db 
    //generate token and remove password and refreshToken and send it to frontend as response.

    const { username, email, password } = req.body
    /// checking if user,email snd pass are empty or user has left them empty
    if (
        [username, email, password].some((field) =>
            field.trim().length === 0)
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = User.findOne({
        $or: [{ username }, { email }]
    });
    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    //multer seeing if user has uploaded  the avatar and coverTmage
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Please upload avatar");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required");
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage.url || "",
        refreshToken: generateRefreshToken()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new ApiError(500, "Failed to register user");
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registed successfully")
    )
})

export { registerUser };