const cloudinary=require("cloudinary").v2;

cloudinary.config({ 
    cloud_name: 'dge6ejkti', 
    api_key: '962425377455653', 
    api_secret: 'S3JagqmaNGkMBEH6XHhGSBDfx7U', timeout: 60000  // Set timeout to 60 seconds
});

module.exports=cloudinary;

