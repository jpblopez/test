const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// GETS ALL USER
exports.getUsers = asyncHandler(async (req, res, next) => {
    try {
        const data = await User.find();
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GETS SPECIFIC USER
exports.getUser = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        res.status(200).json({
            success: true,
            data: user
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ADDS USER
exports.createUser = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json({
            success: true,
            data: user
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATES USER
exports.updateUser = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
    
        res.status(200).json({
            success: true,
            data: user
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE USER
exports.deleteUser = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            data: {}
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
