export const uploadToCloudnary = async (file, resourceType) => {
    if (!file) {
        console.log("Error from upload function: No file provided");
        return null;
    }

    try {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "twit-spare");

        const cloudName = "debtpp9lv";
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

        const res = await fetch(url, {
            method: "POST",
            body: data
        });

        const fileData = await res.json();

        if (fileData.error) {
            console.log("Error from Cloudinary: ", fileData.error.message);
            return null;
        }

        if (fileData.resource_type === 'video') {
            // For videos, use the secure_url for playback
            return fileData.secure_url.toString();
        } else {
            // For images, use the secure_url if available; otherwise, use url
            return fileData.secure_url || fileData.url;
        }
    } catch (error) {
        console.log("Error during upload to Cloudinary: ", error);
        return null;
    }
};
