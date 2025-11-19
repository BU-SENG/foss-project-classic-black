// src/utils/api.js

let mockUser = JSON.parse(localStorage.getItem('user')) || null;
let mockExpenses = JSON.parse(localStorage.getItem('expenses')) || [
  { id: 1, amount: 12.5, category: 'Food', date: '2025-11-10', notes: 'Sandwich and coffee' },
  { id: 2, amount: 9.99, category: 'Books', date: '2025-11-05', notes: 'Notebook and pens' },
];

const CATEGORIES = ['Food', 'Transport', 'Books', 'Entertainment', 'Utilities', 'Other'];


const persistExpenses = () => {
  localStorage.setItem('expenses', JSON.stringify(mockExpenses));
};

const persistUser = () => {
  if (mockUser) {
    localStorage.setItem('user', JSON.stringify(mockUser));
  } else {
    localStorage.removeItem('user');
  }
};


export const api = {
  login: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    if (email && email.endsWith('@student.edu') && password && password.length >= 6) {
      mockUser = { id: Date.now(), email };
      persistUser();
      return { success: true, user: mockUser };
    }
    throw new Error('Invalid email or password');
  },

  signup: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    if (email && email.endsWith('@student.edu') && password && password.length >= 6) {
      mockUser = { id: Date.now(), email };
      persistUser();
      return { success: true, user: mockUser };
    }
    throw new Error('Invalid email or password');
  },

  logout: () => {
    mockUser = null;
    persistUser();
  },

  getCurrentUser: () => mockUser,

  getExpenses: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockExpenses];
  },

  addExpense: async (expenseData) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const newExpense = {
      id: Date.now(),
      amount: parseFloat(expenseData.amount),
      category: expenseData.category,
      date: expenseData.date,
      notes: expenseData.notes.trim() || '—'
    };
    mockExpenses = [newExpense, ...mockExpenses];
    persistExpenses();
    return newExpense;
  },

  updateExpense: async (id, updates) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    mockExpenses = mockExpenses.map(exp =>
      exp.id === id ? { ...exp, ...updates } : exp
    );
    persistExpenses();
    return mockExpenses.find(exp => exp.id === id);
  },

  deleteExpense: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    mockExpenses = mockExpenses.filter(exp => exp.id !== id);
    persistExpenses();
    
  },

  getCategories: () => [...CATEGORIES]
  
};