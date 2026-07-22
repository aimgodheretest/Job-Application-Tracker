import api from "../api/api";

export async function uploadDocument(applicationId, formData) {
  const response = await api.post(
    `/documents/application/${applicationId}`,
    formData,
  );

  return response.data;
}

export async function getDocuments(applicationId) {
  const response = await api.get(`/documents/application/${applicationId}`);

  return response.data;
}

export async function deleteDocument(documentId) {
  const response = await api.delete(`/documents/${documentId}`);

  return response.data;
}
