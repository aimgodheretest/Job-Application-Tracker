import api from "../api/api";

export async function getInterviews(params = {}) {
  const response = await api.get("/interviews", {
    params,
  });

  return response.data;
}

export async function getUpcomingInterviews() {
  const response = await api.get("/interviews/upcoming");

  return response.data;
}

export async function getInterviewById(id) {
  const response = await api.get(`/interviews/${id}`);

  return response.data;
}

export async function createInterview(interviewData) {
  const response = await api.post("/interviews", interviewData);

  return response.data;
}

export async function updateInterview(id, interviewData) {
  const response = await api.put(`/interviews/${id}`, interviewData);

  return response.data;
}

export async function deleteInterview(id) {
  const response = await api.delete(`/interviews/${id}`);

  return response.data;
}
