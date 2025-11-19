// src/components/auth/LoginForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await api.login(email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: 'var(--bg-card)',
      borderRadius: '12px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      border: '1px solid var(--border-color)'
    }}>
      {/* Logo / Title */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{
          width: '64px',
          height: '64px',
          margin: '0 auto 1rem',
          backgroundColor: 'var(--accent-blue)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}>
          🎓
        </div>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: '600',
          color: 'var(--text-primary)',
          marginBottom: '0.25rem'
        }}>
          Welcome Back
        </h2>
        <p style={{
          fontSize: '0.95rem',
          color: 'var(--text-secondary)',
          marginTop: '0.25rem'
        }}>
          Sign in to your student account
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          marginBottom: '1.25rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'rgba(220, 38, 38, 0.1)',
          border: '1px solid var(--accent-red)',
          borderRadius: '8px',
          color: 'var(--accent-red)',
          fontSize: '0.9rem'
        }}>
          <strong>⚠️ Error:</strong> {error}
        </div>
      )}

      {/* Email Field */}
      <div style={{ marginBottom: '1.25rem' }}>
        <label htmlFor="email" style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontSize: '0.9rem',
          fontWeight: '500',
          color: 'var(--text-primary)'
        }}>
          Student Email
        </label>
        <div style={{
          position: 'relative'
        }}>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 0.75rem 0.75rem 2.5rem',
              border: '1px solid var(--input-border)',
              borderRadius: '8px',
              fontSize: '1rem',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              transition: 'border-color 0.2s, box-shadow 0.2s'
            }}
            placeholder="name@student.edu"
            required
          />
          <div style={{
            position: 'absolute',
            left: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-secondary)'
          }}>
            ✉️
          </div>
        </div>
      </div>

      {/* Password Field */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="password" style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontSize: '0.9rem',
          fontWeight: '500',
          color: 'var(--text-primary)'
        }}>
          Password
        </label>
        <div style={{
          position: 'relative'
        }}>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 0.75rem 0.75rem 2.5rem',
              border: '1px solid var(--input-border)',
              borderRadius: '8px',
              fontSize: '1rem',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              transition: 'border-color 0.2s, box-shadow 0.2s'
            }}
            placeholder="••••••••"
            minLength="6"
            required
          />
          <div style={{
            position: 'absolute',
            left: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-secondary)'
          }}>
            🔒
          </div>
        </div>
        <div style={{
          textAlign: 'right',
          marginTop: '0.5rem'
        }}>
          <button
            type="button"
            onClick={() => navigate('/forgot')}
            style={{
              fontSize: '0.85rem',
              color: 'var(--accent-blue)',
              background: 'none',
              border: 'none',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Forgot password?
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '0.85rem',
          backgroundColor: isLoading ? '#1b1b1cff' : 'var(--accent-blue)',
          color: 'gray-100',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          border: 'none',
          boxShadow: isLoading ? 'none' : '0 4px 6px -1px rgba(37, 99, 235, 0.3)',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          if (!isLoading) e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          if (!isLoading) e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>

      {/* Divider */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        margin: '1.5rem 0',
        color: 'var(--text-secondary)'
      }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
        <span style={{ padding: '0 0.75rem', fontSize: '0.85rem' }}>or</span>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
          Don’t have an account?
        </p>
        <button
          type="button"
          onClick={() => navigate('/signup')}
          style={{
            padding: '0.5rem 1.25rem',
            backgroundColor: 'transparent',
            color: 'var(--accent-blue)',
            border: '2px solid var(--accent-blue)',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(37, 99, 235, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          Create Account
        </button>
      </div>
    </form>
  );
}