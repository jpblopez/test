const asyncHandler = require("express-async-handler");
const Customer = require("../models/Customer");

// GETS ALL CUSTOMER
exports.getCustomers = asyncHandler(async (req, res, next) => {
    try {
        const data = await Customer.find();
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GETS SPECIFIC CUSTOMER
exports.getCustomer = asyncHandler(async (req, res, next) => {
    try {
        const customer = await Customer.findById(req.params.id);

        res.status(200).json({
            success: true,
            data: customer
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ADDS CUSTOMER
exports.createCustomer = asyncHandler(async (req, res, next) => {
    try {
        const customer = await Customer.create(req.body);

        res.status(201).json({
            success: true,
            data: customer
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATES CUSTOMER
exports.updateCustomer = asyncHandler(async (req, res, next) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
    
        res.status(200).json({
            success: true,
            data: customer
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE CUSTOMER
exports.deleteCustomer = asyncHandler(async (req, res, next) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            data: {}
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
