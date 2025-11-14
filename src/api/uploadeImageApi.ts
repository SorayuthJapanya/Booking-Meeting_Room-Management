import toast from "react-hot-toast";

const cloudinary_url = import.meta.env.VITE_CLOUDINARY_URL;
const cloudinary_preset = import.meta.env.VITE_CLOUDINARY_PRESET;

export const uploadImageToCloudinary = async (data: File | string) => {
  try {
    const image = new FormData();
    image.append("file", data);
    image.append("upload_preset", cloudinary_preset)

    const response = await fetch(cloudinary_url, {
      method: "POST",
      body: image,
    });

    if (!response.ok) toast.error("Network Error");
    const result = await response.json();
    return result
  } catch (error) {
    console.error(error);
    return toast.error("Failed to upload image");
  }
};
