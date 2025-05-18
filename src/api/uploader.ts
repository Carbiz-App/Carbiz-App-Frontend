import axios from "axios";

const init = axios.create({
  baseURL: "https://carbiz-backend-euek.onrender.com/api/carbiz/v1/files/upload/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const fileUploadReq = async ({
  pathname,
  payload,
}: {
  pathname: string;
  payload: Record<string, File[]>;
}) => {
  const formData = new FormData();

  console.log(payload);

  // Append files to formData
  Object.entries(payload).forEach(([key, files]) => {
    console.log("key: ", key);
    files.forEach((file) => {
      formData.append(key, file);
    });
  });

  try {
    const response = await init.post(pathname, formData);
    const { success, message, payload } = response.data;

    if (!success) {
      throw new Error(message);
    }

    return payload;
  } catch (error: any) {
    console.error("File upload failed:", error.response?.data || error.message);
    throw error;
  }
};

export default fileUploadReq;
