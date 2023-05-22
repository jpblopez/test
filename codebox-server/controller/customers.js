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
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'No files were uploaded.' });
      }
  
      const { name } = req.body;
      const imageFile = req.files.file;
  
      const fileName = `${path.extname(imageFile.name)}`;
  
      // Move the uploaded file to the desired location
      const uploadPath = path.join(__dirname, '/uploads/', fileName);
      await imageFile.mv(uploadPath);
  
      const customer = await Customer.create({
        name,
        imagePath: uploadPath,
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
        const { imageFile } = req.files;
        const fileName = `${path.extname(image.name)}`;
        const uploadPath = path.join(__dirname, '/uploads/', fileName);
  
        await imageFile.mv(uploadPath);
  
        req.body.imagePath = uploadPath;
      }
  
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
