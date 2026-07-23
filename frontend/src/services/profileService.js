import api from "../api/api";

export const getProfile = async () => {
  const response = await api.get("/profile");
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await api.put("/profile", profileData);
  return response.data;
};

export const uploadProfileImage = async (formData) => {
  const response = await api.post("/profile/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteProfileImage = async () => {
  const response = await api.delete("/profile/image");
  return response.data;
};

export const uploadResume = async (formData) => {
  const response = await api.post("/profile/resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteResume = async () => {
  const response = await api.delete("/profile/resume");
  return response.data;
};
