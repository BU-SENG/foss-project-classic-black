// src/pages/DashboardPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';

export default function DashboardPage() {
const [totalThisMonth, setTotalThisMonth] = useState(0);
const [loading, setLoading] = useState(true);

useEffect(() => {
const loadSummary = async () => {
try {
const expenses = await api.getExpenses();

// Filter for current month
const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = String(now.getMonth() + 1).padStart(2, '0');

const thisMonthExpenses = expenses.filter(exp => {
const expDate = new Date(exp.date);
return (
expDate.getFullYear() === currentYear &&
String(expDate.getMonth() + 1).padStart(2, '0') === currentMonth
);
});

const total = thisMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
setTotalThisMonth(total);
} catch (err) {
console.error(err);
} finally {
setLoading(false);
}
};

loadSummary();
}, []);

return (
<div style={{
minHeight: '100vh',
backgroundColor: '#2a2a2dff',
padding: '2rem'
}}>
{/* Header */}
<header style={{
backgroundColor: 'black',
boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
padding: '1rem 2rem',
marginBottom: '2rem'
}}>
<Link
to="/settings"
style={{
fontSize: '0.875rem',
color: 'var(--accent-blue)',
background: 'none',
border: 'none',
fontWeight: '500',
cursor: 'pointer',
display: 'flex',
alignItems: 'center',
gap: '0.25rem'
}}
>
⚙️ Settings
</Link>
<div style={{
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center'
}}>
<h1 style={{
fontSize: '1.5rem',
fontWeight: '600',
color: '#f9fafcff'
}}>
Dashboard
</h1>
<div style={{
display: 'flex',
gap: '1rem',
alignItems: 'center'
}}>
<span style={{ fontSize: '0.875rem', color: '#f9fafcff' }}>
{api.getCurrentUser()?.email}
</span>
<button
onClick={() => {
api.logout();
window.location.href = '/login';
}}
style={{
fontSize: '0.875rem',
color: '#dc2626',
background: 'none',
border: 'none',
fontWeight: '500',
cursor: 'pointer'
}}
>
Logout
</button>
</div>
</div>
</header>

{/* Main Content */}
<main style={{
maxWidth: '1200px',
margin: '0 auto'
}}>
<div style={{
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
marginBottom: '1.5rem'
}}>
<h2 style={{
fontSize: '1.25rem',
fontWeight: '600',
color: '#f9f9faff'
}}>
Overview
</h2>
<Link
to="/add"
style={{
padding: '0.5rem 1rem',
backgroundColor: '#040505ff',
color: 'white',
borderRadius: '0.375rem',
fontSize: '0.875rem',
fontWeight: '500',
textDecoration: 'none'
}}
>
➕ Add Expense
</Link>
</div>

{/* Summary Cards */}
<div style={{
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
gap: '1rem',
marginBottom: '2rem'
}}>
<div style={{
backgroundColor: 'white',
borderRadius: '0.375rem',
boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
padding: '1.5rem',
textAlign: 'center'
}}>
<h3 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
This Month
</h3>
<p style={{
fontSize: '2rem',
fontWeight: '600',
color: '#2216a3ff',
margin: '0.5rem 0'
}}>
{loading ? '⋯' : `$${totalThisMonth.toFixed(2)}`}
</p>
</div>

<div style={{
backgroundColor: 'white',
borderRadius: '0.375rem',
boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
padding: '1.5rem',
textAlign: 'center'
}}>
<h3 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
Top Category
</h3>
<p style={{
fontSize: '1.5rem',
fontWeight: '600',
color: '#2563eb',
margin: '0.5rem 0'
}}>
Food
</p>
</div>

<div style={{
backgroundColor: 'white',
borderRadius: '0.375rem',
boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
padding: '1.5rem',
textAlign: 'center'
}}>
<h3 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
Budget Left
</h3>
<p style={{
fontSize: '1.5rem',
fontWeight: '600',
color: '#9333ea',
margin: '0.5rem 0'
}}>
$87.50
</p>
</div>
</div>

{/* Action Cards */}
<div style={{
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
gap: '1rem'
}}>
<div style={{
backgroundColor: 'white',
borderRadius: '0.375rem',
boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
overflow: 'hidden'
}}>
<div style={{
padding: '1.5rem',
borderBottom: '1px solid #e5e7eb'
}}>
<h3 style={{
fontSize: '1rem',
fontWeight: '600',
color: '#111827'
}}>
Recent Expenses
</h3>
<p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
Your latest 3 transactions
</p>
</div>
<div style={{
padding: '1rem 1.5rem'
}}>
{[1,2,3].map(i => (
<div key={i} style={{
display: 'flex',
justifyContent: 'space-between',
padding: '0.5rem 0',
borderBottom: '1px solid #e5e7eb'
}}>
<span style={{ fontWeight: '500' }}>Lunch</span>
<span style={{ fontWeight: '500', color: '#16a34a' }}>$12.50</span>
</div>
))}
</div>
<div style={{
padding: '1rem 1.5rem',
backgroundColor: '#f9fafb',
textAlign: 'center'
}}>
<Link
to="/expenses"
style={{
color: '#2c26e3ff',
textDecoration: 'underline',
fontWeight: '500',
fontSize: '0.875rem'
}}
>
View all expenses →
</Link>
</div>
</div>

<div style={{
backgroundColor: 'white',
borderRadius: '0.375rem',
boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
overflow: 'hidden'
}}>
<div style={{
padding: '1.5rem',
borderBottom: '1px solid #e5e7eb'
}}>
<h3 style={{
fontSize: '1rem',
fontWeight: '600',
color: '#111827'
}}>
Categories
</h3>
<p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
Track spending by type
</p>
</div>
<div style={{
padding: '1rem 1.5rem',
display: 'grid',
gridTemplateColumns: 'repeat(2, 1fr)',
gap: '0.5rem'
}}>
{['Food', 'Books', 'Transport'].map(cat => (
<div key={cat} style={{
display: 'flex',
alignItems: 'center',
gap: '0.5rem',
padding: '0.5rem',
borderRadius: '0.375rem',
backgroundColor: '#f3f4f6'
}}>
<span>{cat === 'Food' ? '🍔' : cat === 'Books' ? '📚' : '🚌'}</span>
<span style={{ fontSize: '0.875rem' }}>{cat}</span>
</div>
))}
</div>
<div style={{
padding: '1rem 1.5rem',
backgroundColor: '#f9fafb',
textAlign: 'center'
}}>
<Link
to="/categories"
style={{
color: '#2563eb',
textDecoration: 'underline',
fontWeight: '500',
fontSize: '0.875rem'
}}
>
Browse all categories →
</Link>
</div>
</div>
</div>
</main>
</div>
);
}
