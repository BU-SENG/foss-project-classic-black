// src/components/auth/SignupForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      await api.signup(email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
          Email (use @student.edu)
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '0.875rem'
          }}
          placeholder="e.g. jsmith@student.edu"
          required
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
          Password (min 6 chars)
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '0.875rem'
          }}
          placeholder="••••••••"
          minLength="6"
          required
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
          Confirm Password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '0.875rem'
          }}
          placeholder="••••••••"
          minLength="6"
          required
        />
      </div>

      {error && (
        <div style={{
          padding: '0.5rem',
          backgroundColor: '#fee2e2',
          color: '#dc2626',
          borderRadius: '0.375rem',
          fontSize: '0.875rem'
        }}>
          ❌ {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: isLoading ? '#9ca3af' : '#16a34a',
          color: 'white',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          fontWeight: '500',
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
      </button>

      <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => navigate('/login')}
          style={{
            color: '#2563eb',
            textDecoration: 'underline',
            background: 'none',
            border: 'none',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          Sign in
        </button>
      </div>
    </form>
  );
}
