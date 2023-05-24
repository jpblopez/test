const asyncHandler = require("express-async-handler");
const Customer = require("../models/Customer");
const path = require("path");

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
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'No files were uploaded.' });
      }
  
      const name = req.body.name;
      const imageFile = req.files.file;
      const dummyPath = path.join('/uploads', imageFile.name);
      const imgPath = dummyPath.replace(/\\/g,"/");
        
      // Move the uploaded file to the desired location
      const uploadPath = path.join(__dirname, '..', '/public/uploads/', imageFile.name);
      await imageFile.mv(uploadPath);
        
      const customer = await Customer.create({
        name,
        imagePath: imgPath,
      });
  
      res.status(201).json({
        success: true,
        data: customer,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// UPDATES CUSTOMER
exports.updateCustomer = asyncHandler(async (req, res, next) => {
    try {
      if (req.files) {
        const imageFile = req.files.file;
        const dummyPath = path.join('/uploads', imageFile.name);
        const imgPath = dummyPath.replace(/\\/g,"/");
        const uploadPath = path.join(__dirname, '..', '/public/uploads/', imageFile.name);
  
        await imageFile.mv(uploadPath);
  
        req.body.imagePath = imgPath;
      }

      req.body.updatedAt = Date.now();

      console.log(req.body.name,123);
  
      const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
  
      res.status(200).json({
        success: true,
        data: customer,
      });
    } catch (error) {
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
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
