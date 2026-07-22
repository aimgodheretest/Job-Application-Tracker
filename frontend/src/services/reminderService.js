import api from "../api/api";

export async function getReminders(params = {}) {
  const response = await api.get("/reminders", {
    params,
  });

  return response.data;
}

export async function getUpcomingReminders() {
  const response = await api.get("/reminders/upcoming");

  return response.data;
}

export async function getReminderById(id) {
  const response = await api.get(`/reminders/${id}`);

  return response.data;
}

export async function createReminder(reminderData) {
  const response = await api.post("/reminders", reminderData);

  return response.data;
}

export async function updateReminder(id, reminderData) {
  const response = await api.put(`/reminders/${id}`, reminderData);

  return response.data;
}

export async function deleteReminder(id) {
  const response = await api.delete(`/reminders/${id}`);

  return response.data;
}

export async function markReminderCompleted(id) {
  const response = await api.patch(`/reminders/${id}/complete`);

  return response.data;
}
