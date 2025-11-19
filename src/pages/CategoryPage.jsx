// src/pages/CategoryPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';

const ICONS = {
  Food: '🍔',
  Transport: '🚌',
  Books: '📚',
  Entertainment: '🎬',
  Utilities: '💡',
  Other: '📦'
};

export default function CategoryPage() {
  const [expenses, setExpenses] = useState([]);
  const categories = api.getCategories();

  useEffect(() => {
    api.getExpenses().then(setExpenses);
  }, []);

  const getCategoryStats = (category) => {
    const catExpenses = expenses.filter(e => e.category === category);
    const total = catExpenses.reduce((sum, e) => sum + e.amount, 0);
    return {
      total,
      count: catExpenses.length
    };
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#28292aff',
      padding: '2rem'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'black',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        padding: '1rem 2rem',
        marginBottom: '2rem'
      }}>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#f7f8f9ff'
        }}>
          Categories
        </h1>
      </header>

      {/* Main */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <p style={{
          fontSize: '1rem',
          color: '#f7f8faff',
          marginBottom: '2rem'
        }}>
          Click a category to view or add expenses in that group.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {categories.map(category => {
            const { total, count } = getCategoryStats(category);
            return (
              <Link
                key={category}
                to={`/expenses?category=${category}`}
                style={{
                  display: 'block',
                  backgroundColor: 'white',
                  borderRadius: '0.375rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  padding: '1.5rem',
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '0.5rem'
                }}>
                  {ICONS[category] || '🏷️'}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  {category}
                </h3>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#16a34a',
                  marginBottom: '0.25rem'
                }}>
                  ${total.toFixed(2)}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  {count} expense{count !== 1 ? 's' : ''}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Add New */}
        <div style={{
          textAlign: 'center',
          marginTop: '2rem'
        }}>
          <Link
            to="/add"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#f6f8faff',
              color: 'black',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              fontWeight: '500',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            ➕ Add New Expense
          </Link>
        </div>
      </main>
    </div>
  );
}
