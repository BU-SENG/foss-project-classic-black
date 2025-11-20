// src/components/auth/ForgotPasswordForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.endsWith('@student.edu')) {
      setError('Please enter a valid student email (@student.edu)');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  if (submitted) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        fontSize: '1rem'
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✅</div>
        <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Check your inbox!</h3>
        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
          We sent password reset instructions to <strong>{email}</strong>.
        </p>
        <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
          Student Email
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
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#2563eb',
          color: 'white',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          fontWeight: '500',
          cursor: 'pointer'
        }}
      >
        Send Reset Link
      </button>

      <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
        Remembered your password?{' '}
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