import api from "../api/api";

export async function changePassword(data) {
  const response = await api.put("/settings/change-password", data);
  return response.data;
}

export async function deleteAccount(password) {
  const response = await api.delete("/settings/delete-account", {
    data: { password },
  });

  return response.data;
}
