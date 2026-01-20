const API_URL = "http://localhost:5000/api";

export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  return fetch(`${API_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  });
};
