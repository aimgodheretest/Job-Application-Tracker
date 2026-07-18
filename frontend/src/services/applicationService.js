import api from "../api/api";

export async function getApplications(params = {}) {
  const response = await api.get("/applications", {
    params,
  });

  return response.data;
}
