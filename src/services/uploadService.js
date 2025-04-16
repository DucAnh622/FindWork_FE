import axiosInstance from "./axiosInstance";

export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    return axiosInstance.post('/upload/upload-cloud', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
