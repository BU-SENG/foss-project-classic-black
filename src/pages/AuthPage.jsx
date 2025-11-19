// src/pages/AuthPage.jsx
import { Outlet } from 'react-router-dom';

export default function AuthPage() {
  return (
    <div style={{
      minHeight: '100vh',
      // ✅ CHANGE THIS LINE TO YOUR PREFERRED BACKGROUND:
      background: 'linear-gradient(135deg, #fcfdfdff 0%, #f8f9faff 50%, #f7f8faff 100%)',
      
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: 'var(--bg-card)', // ← Dynamic card background
        borderRadius: '12px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden'
      }}>
        <Outlet />
      </div>
    </div>
  );
}