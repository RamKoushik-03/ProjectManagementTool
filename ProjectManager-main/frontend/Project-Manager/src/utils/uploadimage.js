import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
    const formdata = new FormData();
    //Append image file to form data"
    formdata.append("image", imageFile);
    try {
        const response = await axiosInstance.post(API_PATHS.Image.UPLOAD, formdata, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data; // return response data
    } catch (error) {
        console.error("Image upload failed", error);
        throw error; //rethrow error for handliing
    }
};

export default uploadImage;