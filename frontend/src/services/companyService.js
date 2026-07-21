import api from "../api/api";

export async function getCompanies(params = {}) {
  const response = await api.get("/companies", {
    params,
  });

  return response.data;
}

export async function getCompanyById(id) {
  const response = await api.get(`/companies/${id}`);

  return response.data;
}

export async function createCompany(companyData) {
  const response = await api.post("/companies", companyData);

  return response.data;
}

export async function updateCompany(id, companyData) {
  const response = await api.put(`/companies/${id}`, companyData);

  return response.data;
}

export async function deleteCompany(id) {
  const response = await api.delete(`/companies/${id}`);

  return response.data;
}
