const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc Register a user
// @route POST /api/v1/groceries/registration
// @access Public
exports.addUser = async (req, res, next) => {

    try {
        // Obtaining email, password and displayName from the body of the req
        let { email, password, displayName } = req.body;

        // Check to see if any of these fields are empty
        // Return 400 status for not providing all the fields
        if (!email || !password) return res.status(400).json({ message: "Please enter all the fields." })

        // Password length
        if (password.length < 5) return res.status(400).json({ message: "Password is less than 5 characters long" })

        // Check for an existing user
        const existingUser = await User.findOne({ email: email })
        if (existingUser) return res.status(400).json({ message: "Account with this email already exits. Please create a new email" })

        // Set default display name if none is set
        if (!displayName) displayName = email;

        // Creating a salt for the password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Creating a new User after validation checks   
        const newUser = new User({
            email,
            password: passwordHash,
            displayName
        });

        // Save User in the database
        const savedUser = await newUser.save();

        // Sending a response of 201(created status)
        return res.status(201).json({
            success: true,
            data: savedUser
        });

    } catch (err) {
        console.log(err)
        // We are checking for error with a name of Validation to stores all it's messages
        if (err.name == "ValidationError") {
            const messages = Object.values(err.errors).map(val => val.message)  // Adding all the error messages into an array
            // Sending a response of 400(client error)
            // We are sending back error messages so it can be used in the front end
            return res.status(400).json({
                success: false,
                error: messages
            });

        } else {
            return res.status(500).json({
                success: false,
                error: "The server has encountered a situation it doesn't know how to handle"
            });
        }
    }
}


// @desc Login a user
// @route POST /api/v1/groceries/registration
// @access Public
exports.loginUser = async (req, res, next) => {

    try {
        // Obtaining email, password and displayName from the body of the req
        const { email, password } = req.body;

        // Check to see if any of these fields are empty
        // Return 400 status for not providing all the fields
        if (!email || !password) return res.status(400).json({ message: "Please enter all the fields." });

        // Checking for the email existence and then returning an object
        const user_login = await User.findOne({ email: email });

        // Check if user exist
        if (!user_login) return res.status(400).json({ message: "This user does not exist." })

        // If user exist, then we will compare the user's password with the one provided for usf
        const ismatch = await bcrypt.compare(password, user_login.password)

        if (!ismatch) return res.status(400).json({ message: "Your password is incorrect." })

        // New user object
        const loginUser = new User({
            id: user_login._id,
            displayName: user_login.displayName,
            email: user_login.email
        });

        // Signing the JWT with the User currently logged with their Id
        const token = jwt.sign({ id: user_login._id }, process.env.JWT_SECRET)

        // Sending a response of 201(created status)
        return res.status(201).json({
            success: true,
            token,
            data: loginUser
        });

    } catch (err) {
        console.log(err)
        // We are checking for error with a name of Validation to stores all it's messages
        if (err.name == "ValidationError") {
            const messages = Object.values(err.errors).map(val => val.message)  // Adding all the error messages into an array
            // Sending a response of 400(client error)
            // We are sending back error messages so it can be used in the front end
            return res.status(400).json({
                success: false,
                error: messages
            });

        } else {
            return res.status(500).json({
                success: false,
                error: "The server has encountered a situation it doesn't know how to handle"
            });
        }
    }

}

// @desc Delete a user
// @route POST /api/v1/groceries/registration
// @access Public
exports.deleteUser = async (req, res, next) => {
    try {
        // Deleting a user from the database with findByIdAndDelete
        const delete_user = await User.findByIdAndDelete(req.user);

        // Sending a response of 201(created status)
        return res.status(200).json({
            success: true,
            data: delete_user
        });

    } catch (err) {
        // Send an error message with status of 500 when something goes wrong
        return res.status(500).json({
            success: true,
            data: "The server has encountered a situation it doesn't know how to handle"
        });
    }
}

// @desc Check valid token
// @route Post /api/v1/user/validToken
// @access Public
exports.validToken = async (req, res, next) => {
    try {
        // Getting the x-auth-token value from the header from the front-end
        const token = req.header("x-auth-token");
        
        // Check for empty token and return false
        if (!token) return res.json(false);

        // If the token exist, we verify it with the token secrete
        const verified = jwt.verify(token, process.env.JWT_SECRET);
    
        // Check for empty token and return false
        if (!verified) return res.json(false);

        // Search for the user by the verified ID
        const user = await User.findById(verified.id)

        // Check for valid user,
        if(!user) return res.json(false)

        // If user exist
        return res.json(true)

    } catch (err) {
        // Send an error message with status of 500 when something goes wrong
        return res.status(500).json({
            success: true,
            data: "The server has encountered a situation it doesn't know how to handle"
        });
    }
}


// @desc Get user data
// @route Get /api/v1/user/
// @access Public
exports.getUserData = async (req, res, next) => {
    try {
        // Getting the x-auth-token value from the header from the front-end
        const user_data = await User.findById(req.user);
        
        // Check for empty token and return false
        if (!user_data) return res.json(false);

        // If user exist, return user data
        return res.json({
            success: true,
            data: user_data
        })

    } catch (err) {
        // Send an error message with status of 500 when something goes wrong
        return res.status(500).json({
            success: true,
            data: "The server has encountered a situation it doesn't know how to handle"
        });
    }
}