import api from "../api/api";

// GET ALL
export async function getSavedJobs(params) {
  const response = await api.get("/saved-jobs", {
    params,
  });

  return response.data;
}

// GET ONE
export async function getSavedJob(id) {
  const response = await api.get(`/saved-jobs/${id}`);

  return response.data;
}

// CREATE
export async function createSavedJob(data) {
  const response = await api.post("/saved-jobs", data);

  return response.data;
}

// UPDATE
export async function updateSavedJob(id, data) {
  const response = await api.put(`/saved-jobs/${id}`, data);

  return response.data;
}

// DELETE
export async function deleteSavedJob(id) {
  const response = await api.delete(`/saved-jobs/${id}`);

  return response.data;
}
