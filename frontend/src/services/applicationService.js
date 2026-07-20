import api from "../api/api";

export async function getApplications(params = {}) {
  const response = await api.get("/applications", {
    params,
  });

  return response.data;
}
export async function createApplication(applicationData) {
  const response = await api.post("/applications", applicationData);

  return response.data;
}

export async function updateApplication(id, applicationData) {
  const response = await api.put(`/applications/${id}`, applicationData);

  return response.data;
}

export async function deleteApplication(id) {
  const response = await api.delete(`/applications/${id}`);

  return response.data;
}
