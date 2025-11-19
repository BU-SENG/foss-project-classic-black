// src/pages/SettingsPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';


export default function SettingsPage() {
  const [user, setUser] = useState({ name: '', email: '' });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  // Load user data on mount
  useEffect(() => {
    const currentUser = api.getCurrentUser();
    if (currentUser) {
      setUser({
        name: localStorage.getItem('user_name') || currentUser.email.split('@')[0] || '',
        email: currentUser.email
      });
    }
    setCurrency(localStorage.getItem('currency') || 'USD');
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate
    if (password && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSaving(true);

    try {
      // 🛠️ If you have a backend, call update API here
      // For now, save to localStorage (mock)
      if (user.name) {
        localStorage.setItem('user_name', user.name);
      }
      if (password) {
        // In real app: await api.updatePassword(password);
        // For mock: just log
        console.log('Password updated (mock)');
      }
      localStorage.setItem('currency', currency);

      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    api.logout();
    navigate('/login', { replace: true });
  };

  const currencies = [
    { code: 'USD', name: 'US Dollar ($)' },
    { code: 'EUR', name: 'Euro (€)' },
    { code: 'GBP', name: 'British Pound (£)' },
    { code: 'JPY', name: 'Japanese Yen (¥)' },
    { code: 'CAD', name: 'Canadian Dollar (CA$)' },
    { code: 'AUD', name: 'Australian Dollar (AU$)' },
    { code: 'INR', name: 'Indian Rupee (₹)' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      padding: '2rem'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'var(--bg-card)',
        boxShadow: 'var(--shadow-sm)',
        padding: '1rem 2rem',
        marginBottom: '2rem',
        borderRadius: '8px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'var(--text-primary)'
          }}>
            Settings
          </h1>
          <button
            onClick={() => navigate(-1)}
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              background: 'none',
              border: 'none',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            ← Back
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {error && (
          <div style={{
            marginBottom: '1.5rem',
            padding: '0.75rem 1rem',
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
            border: '1px solid var(--accent-red)',
            borderRadius: '8px',
            color: 'var(--accent-red)',
            fontSize: '0.9rem'
          }}>
            ❌ {error}
          </div>
        )}

        {success && (
          <div style={{
            marginBottom: '1.5rem',
            padding: '0.75rem 1rem',
            backgroundColor: 'rgba(22, 163, 74, 0.1)',
            border: '1px solid var(--accent-green)',
            borderRadius: '8px',
            color: 'var(--accent-green)',
            fontSize: '0.9rem'
          }}>
            ✅ {success}
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.5rem'
        }}>
          {/* Profile Section */}
          <section style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-sm)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid var(--border-color)',
              backgroundColor: 'rgba(37, 99, 235, 0.05)'
            }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: 'var(--text-primary)'
              }}>
                🧑 Profile
              </h2>
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                marginTop: '0.25rem'
              }}>
                Update your personal information
              </p>
            </div>
            <form onSubmit={handleSaveProfile} style={{ padding: '1.5rem' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label htmlFor="name" style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)'
                }}>
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--input-border)',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label htmlFor="email" style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)'
                }}>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={user.email}
                  disabled
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-secondary)',
                    cursor: 'not-allowed'
                  }}
                />
                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  marginTop: '0.25rem'
                }}>
                  Email cannot be changed (student ID required)
                </p>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label htmlFor="password" style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)'
                }}>
                  New Password (optional)
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--input-border)',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="confirmPassword" style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)'
                }}>
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--input-border)',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSaving}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  backgroundColor: isSaving ? '#9ca3af' : 'var(--accent-blue)',
                  color: 'white',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  border: 'none',
                  cursor: isSaving ? 'not-allowed' : 'pointer'
                }}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </section>

          {/* Preferences Section */}
          <section style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-sm)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid var(--border-color)',
              backgroundColor: 'rgba(168, 85, 247, 0.05)'
            }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: 'var(--text-primary)'
              }}>
                ⚙️ Preferences
              </h2>
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                marginTop: '0.25rem'
              }}>
                Customize your experience
              </p>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label htmlFor="currency" style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)'
                }}>
                  Preferred Currency
                </label>
                <select
                  id="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--input-border)',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='currentColor' d='M14.83 7.5l-.09-.09a.5.5 0 00-.71.71l3.5 3.5a.5.5 0 00.71 0l3.5-3.5a.5.5 0 10-.71-.71L17 11.41l-3.5-3.5a.5.5 0 00-.67-.09zM5.41 11L2 7.5a.5.5 0 10-.71.71l3.5 3.5a.5.5 0 00.71 0l3.5-3.5a.5.5 0 00-.71-.71L5.41 11z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    paddingRight: '2rem'
                  }}
                >
                  {currencies.map(curr => (
                    <option key={curr.code} value={curr.code}>
                      {curr.name}
                    </option>
                  ))}
                </select>
                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  marginTop: '0.25rem'
                }}>
                  Expenses will be displayed in your selected currency.
                </p>
              </div>

              
            </div>
          </section>

          {/* Danger Zone */}
          <section style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-sm)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid var(--border-color)',
              backgroundColor: 'rgba(220, 38, 38, 0.05)'
            }}>
              
            </div>
            <div style={{ padding: '1.5rem' }}>
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                marginBottom: '1rem'
              }}>
                Actions that affect your account security.
              </p>
              <button
                type="button"
                onClick={handleLogout}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--accent-red)',
                  color: 'black',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                🔐 Logout
              </button>
              {/* Optional: Add "Delete Account" later */}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
