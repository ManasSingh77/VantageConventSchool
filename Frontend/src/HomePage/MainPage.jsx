import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  // Styles organized as constants for better readability
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #fffbe6 0%, #fff 100%)',
      color: '#bfa700',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.5rem 3rem',
      background: '#fffbe6',
      borderBottom: '2px solid #ffe066',
      boxShadow: '0 2px 8px rgba(191,167,0,0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    },
    navButton: {
      background: '#fffbe6',
      color: '#bfa700',
      border: '2px solid #bfa700',
      borderRadius: '24px',
      fontWeight: 'bold',
      fontSize: '1rem',
      cursor: 'pointer',
      padding: '0.5rem 1.5rem',
      transition: 'all 0.3s ease',
      outline: 'none',
      ':hover': {
        background: '#bfa700',
        color: '#fffbe6',
        transform: 'scale(1.05)'
      },
      ':active': {
        transform: 'scale(0.98)'
      }
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1rem',
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center'
    },
    title: {
      color: '#bfa700',
      fontSize: '3rem',
      marginBottom: '2rem',
      fontWeight: 'bold',
      textShadow: '0 2px 8px rgba(255, 224, 102, 0.5)',
      animation: 'fadeInDown 1s ease'
    },
    subtitle: {
      fontSize: '1.5rem',
      marginBottom: '3rem',
      background: '#fffbe6',
      borderRadius: '12px',
      padding: '1.5rem 2rem',
      boxShadow: '0 4px 16px rgba(191,167,0,0.1)',
      lineHeight: '1.6',
      animation: 'fadeIn 1.5s ease'
    },
    schoolName: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#bfa700',
      margin: '2rem 0',
      padding: '1.5rem',
      border: '2px dashed #ffe066',
      borderRadius: '8px',
      animation: 'pulse 2s infinite alternate'
    },
    footer: {
      textAlign: 'center',
      padding: '1.5rem',
      background: '#fffbe6',
      borderTop: '2px solid #ffe066',
      fontSize: '1rem',
      color: '#bfa700',
      boxShadow: '0 -2px 8px rgba(191,167,0,0.08)'
    }
  };

  // Inline style with hover effects
  const buttonHoverEffects = {
    ...styles.navButton,
    ':hover': {
      ...styles.navButton[':hover']
    },
    ':active': {
      ...styles.navButton[':active']
    }
  };

  return (
    <div style={styles.container}>
      {/* Global styles for animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes fadeInDown {
            from { 
              opacity: 0;
              transform: translateY(-20px);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes pulse {
            from { transform: scale(1); }
            to { transform: scale(1.05); }
          }
        `}
      </style>

      {/* Header */}
      <header style={styles.header}>
        <div style={{ fontWeight: 'bold', fontSize: '1.5rem', letterSpacing: '1px' }}>
          Student Portal
        </div>
        <button
          style={buttonHoverEffects}
          onClick={() => navigate('/selectDashboard')}
          onMouseOver={e => { 
            e.target.style.background = '#bfa700'; 
            e.target.style.color = '#fffbe6';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseOut={e => { 
            e.target.style.background = '#fffbe6'; 
            e.target.style.color = '#bfa700';
            e.target.style.transform = 'scale(1)';
          }}
          onMouseDown={e => { e.target.style.transform = 'scale(0.98)'; }}
          onMouseUp={e => { e.target.style.transform = 'scale(1.05)'; }}
        >
          Select Dashboard
        </button>
      </header>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <h2 style={styles.title}>Student Management System</h2>
        <p style={styles.subtitle}>
          Welcome to the <span style={{ fontWeight: 'bold', color: '#bfa700' }}>Vantage Convent School</span> student portal. 
          Manage your academic journey with our comprehensive tools and resources.
        </p>
        
        <div style={styles.schoolName}>
          Vantage Convent School
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        © {new Date().getFullYear()} Vantage Convent School. Created by Manas Singh.
      </footer>
    </div>
  );
}

export default MainPage;