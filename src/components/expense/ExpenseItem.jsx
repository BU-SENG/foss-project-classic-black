// src/components/expense/ExpenseItem.jsx
import { useState } from 'react';
import { api } from '../../utils/api';

export default function ExpenseItem({ expense, onExpenseChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editData, setEditData] = useState({ ...expense });

  const categories = api.getCategories();

  const handleEditChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await api.updateExpense(expense.id, {
        amount: parseFloat(editData.amount),
        category: editData.category,
        date: editData.date,
        notes: editData.notes
      });
      onExpenseChange();
      setIsEditing(false);
    } catch (err) {
      alert('Failed to update expense');
    }
  };

  const handleDelete = async () => {
    try {
      await api.deleteExpense(expense.id);
      onExpenseChange();
      setShowDeleteConfirm(false);
    } catch (err) {
      alert('Failed to delete expense');
    }
  };

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  if (isEditing) {
    return (
      <div style={{
        backgroundColor: '#fef3c7',
        padding: '1rem',
        borderRadius: '0.375rem',
        border: '1px solid #f59e0b',
        marginBottom: '0.5rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
              Amount ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={editData.amount}
              onChange={(e) => handleEditChange('amount', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem'
              }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
              Category
            </label>
            <select
              value={editData.category}
              onChange={(e) => handleEditChange('category', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem'
              }}
              required
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
              Date
            </label>
            <input
              type="date"
              value={editData.date}
              onChange={(e) => handleEditChange('date', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem'
              }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
              Notes
            </label>
            <textarea
              value={editData.notes}
              onChange={(e) => handleEditChange('notes', e.target.value)}
              rows="2"
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem'
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.5rem' }}>
            <button
              onClick={handleSave}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#16a34a',
                color: 'white',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#9ca3af',
                color: 'white',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.375rem',
      border: '1px solid #e5e7eb',
      padding: '1rem',
      marginBottom: '0.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'start'
    }}>
      <div>
        <div style={{
          fontSize: '1rem',
          fontWeight: '600',
          color: '#111827'
        }}>
          ${parseFloat(expense.amount).toFixed(2)}
        </div>
        <div style={{
          fontSize: '0.875rem',
          color: '#6b7280',
          marginTop: '0.25rem'
        }}>
          {expense.category} • {formatDate(expense.date)}
        </div>
        {expense.notes && expense.notes !== '—' && (
          <div style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            fontStyle: 'italic',
            marginTop: '0.25rem'
          }}>
            "{expense.notes}"
          </div>
        )}
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem'
      }}>
        <button
          onClick={() => setIsEditing(true)}
          style={{
            fontSize: '0.875rem',
            color: '#2563eb',
            background: 'none',
            border: 'none',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          Edit
        </button>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          style={{
            fontSize: '0.875rem',
            color: '#dc2626',
            background: 'none',
            border: 'none',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          Delete
        </button>
      </div>

      {showDeleteConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.375rem',
            padding: '1.5rem',
            width: '300px',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '0.5rem'
            }}>
              Confirm Delete
            </h3>
            <p style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              marginBottom: '1rem'
            }}>
              Are you sure you want to delete this ${expense.amount} expense?
            </p>
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              justifyContent: 'center'
            }}>
              <button
                onClick={handleDelete}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#e5e7eb',
                  color: '#111827',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}