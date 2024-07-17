const express = require("express");
const router = express.Router();
const cloudinary = require("../config/cloudinary");
const upload = require("../config/multer");
const File = require('../models/fileModel')
const fs = require('fs');

router.get('/upload', (req, res) => {
    res.render('upload');
})

router.post('/upload', upload.array('files', 10), async (req, res) => {
    try {
        // Create an array of upload promises
        const uploadPromises = req.files.map(file =>
            cloudinary.uploader.upload(file.path)
        );

        // Wait for all promises to complete
        const results = await Promise.all(uploadPromises);
        let urlss = [];
        // Extract URLs from results
        const urls = results.forEach(result => {
            urlss.push(result.secure_url)

        }
        );

        // Save URLs to MongoDB
        const newFile = new File({ urls: urlss });
        await newFile.save();

        req.files.forEach(file => fs.unlinkSync(file.path));


        // Send a response with the URLs
        res.json({
            message: 'Files uploaded successfully!',
            urls
        });
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).json({ message: 'Error uploading files', error: error.message });
    }
});



module.exports = router;
