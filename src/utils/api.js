// src/utils/api.js
const API_BASE_URL = "http://localhost:3000"; // Change this to your actual API URL

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const api = {
  // Auth endpoints
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await handleResponse(response);

    if (data.access_token) {
      sessionStorage.setItem("token", data.access_token);
      if (data.user) {
        sessionStorage.setItem("user", JSON.stringify(data.user));
      }
    }
    return data;
  },

  register: async (email, password, name) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        name,
        spendLimit: 0,
        monthlyIncome: 0,
      }),
    });
    const data = await handleResponse(response);

    if (data.access_token) {
      sessionStorage.setItem("token", data.access_token);
      if (data.user) {
        sessionStorage.setItem("user", JSON.stringify(data.user));
      }
    }
    return data;
  },

  logout: () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  },

  // User endpoints
  getCurrentUser: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/self`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      const data = await handleResponse(response);
      sessionStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      // If request fails (e.g., token expired), clear session and return null
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      return null;
    }
  },

  findAllUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  findUserSelf: async () => {
    const response = await fetch(`${API_BASE_URL}/user/self`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    const data = await handleResponse(response);
    sessionStorage.setItem("user", JSON.stringify(data));
    return data;
  },

  updateUser: async (id, updates) => {
    const response = await fetch(`${API_BASE_URL}/user/${id}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
    });
    const data = await handleResponse(response);
    sessionStorage.setItem("user", JSON.stringify(data));
    return data;
  },

  deleteUser: async (id) => {
    const response = await fetch(`${API_BASE_URL}/user/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    const data = await handleResponse(response);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    return data;
  },

  // Expense endpoints
  getExpenses: async () => {
    const response = await fetch(`${API_BASE_URL}/expense`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  addExpense: async (expenseData) => {
    const response = await fetch(`${API_BASE_URL}/expense`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(expenseData),
    });
    return handleResponse(response);
  },

  getTotalExpenses: async () => {
    const response = await fetch(`${API_BASE_URL}/expense/total`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getExpensesByCategory: async (category) => {
    const response = await fetch(
      `${API_BASE_URL}/expense/category/${category}`,
      {
        method: "GET",
        headers: getAuthHeaders(),
      }
    );
    return handleResponse(response);
  },

  getExpenseById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/expense/${id}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  updateExpense: async (id, updates) => {
    const response = await fetch(`${API_BASE_URL}/expense/${id}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
    });
    return handleResponse(response);
  },

  deleteExpense: async (id) => {
    const response = await fetch(`${API_BASE_URL}/expense/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Utility methods
  getCategories: () => [
    "FOOD",
    "TRANSPORT",
    "ENTERTAINMENT",
    "HEALTH",
    "UTILITIES",
    "EDUCATION",
    "OTHER",
  ],

  isAuthenticated: () => !!sessionStorage.getItem("token"),

  getToken: () => sessionStorage.getItem("token"),
};
