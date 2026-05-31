import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload file to cloudinary
export async function uploadToCloudinary(filepath, folder = 'Doctor') {
    try {
        const result = await cloudinary.uploader.upload(filepath, {
            folder,
            resource_type: 'image',
        });

        // Remove local file after upload
        fs.unlinkSync(filepath);
        return {
            url: result.secure_url,
            publicId: result.public_id,
        };

    } catch (err) {
        // Delete local file even if upload fails
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }
        console.error('Cloudinary upload error:', err);
        throw err;
    }
}

// Delete file from cloudinary
export async function deleteFromCloudinary(publicId) {
    try {
        const result = await cloudinary.destroy(publicId);
        return result;
    } catch (err) {
        console.error('Cloudinary delete error:', err);
        throw err;
    }
}

//to delete an image that is prese in cloudinary if user remove  from the ui

 export async function deleteCloudinary(publicId){
    try{
        if(!publicId) return;
        await cloudinary.uploader.destroy(publicId);
    }
    catch(err){
        console.error('Cloudinary delete error:', err);
        throw err;
    }
 }

 export default cloudinary;