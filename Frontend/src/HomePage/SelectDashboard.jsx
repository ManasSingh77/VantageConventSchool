import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SelectDashboard() {
  const [selectedDashboard, setSelectedDashboard] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const dashboards = [
    { id: 'student', name: 'Student Fees', icon: '📊', manager: 'Academic Manager' },
    { id: 'transport', name: 'Transport Fees', icon: '🚌', manager: 'Transport Manager' },
    { id: 'report', name: 'Report Card', icon: '📝', manager: 'Examination Manager' },
    { id: 'mk-traders', name: 'MK Traders', icon: '🏢', manager: 'Business Manager' },
    { id: 'manager', name: 'School Manager', icon: '👔', manager: 'Head Manager' }
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!selectedDashboard) {
      setError('Please select a dashboard');
      return;
    }
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('http://127.0.0.1:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          type: selectedDashboard
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        navigate(`/${selectedDashboard}-dashboard`);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header with logo and school name */}
        <div style={styles.header}>
          <div style={styles.logoContainer}>
            {/* Replace with your actual logo path */}
            <img 
              src="/VantageLogo.jpg" 
              alt="School Logo" 
              style={styles.logo} 
            />
            <h1 style={styles.schoolName}>Vantage Convent School</h1>
          </div>
        </div>

        <h2 style={styles.title}>Choose the Dashboard to Login</h2>
        <p style={styles.subtitle}>Please select a dashboard to continue</p>
        
        <div style={styles.dashboardGrid}>
          {dashboards.map((dashboard) => (
            <div
              key={dashboard.id}
              style={{
                ...styles.dashboardCard,
                borderColor: selectedDashboard === dashboard.id ? '#bfa700' : '#ffe066',
                backgroundColor: selectedDashboard === dashboard.id ? '#fffbe6' : 'white'
              }}
              onClick={() => setSelectedDashboard(dashboard.id)}
            >
              <div style={styles.dashboardIcon}>{dashboard.icon}</div>
              <h3 style={styles.dashboardName}>{dashboard.name}</h3>
              <p style={styles.managerText}>Managed by: {dashboard.manager}</p>
            </div>
          ))}
        </div>

        {selectedDashboard && (
          <form onSubmit={handleLogin} style={styles.loginForm}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
                placeholder="Enter your username"
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  placeholder="Enter your password"
                />
                <button 
                  type="button" 
                  style={styles.eyeButton}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>
            
            {error && <p style={styles.error}>{error}</p>}
            
            <button
              type="submit"
              style={styles.loginButton}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #fffbe6 0%, #fff 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(191, 167, 0, 0.1)',
    padding: '2.5rem',
    maxWidth: '900px',
    width: '100%',
    textAlign: 'center'
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.5rem'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  logo: {
    height: '60px',
    width: 'auto',
    borderRadius: '50%',
    border: '2px solid #ffe066'
  },
  schoolName: {
    color: '#bfa700',
    fontSize: '1.8rem',
    margin: 0,
    fontWeight: '600',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
  },
  title: {
    color: '#bfa700',
    fontSize: '2rem',
    marginBottom: '0.5rem',
    fontWeight: '600'
  },
  subtitle: {
    color: '#666',
    fontSize: '1.1rem',
    marginBottom: '2rem'
  },
  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  dashboardCard: {
    border: '2px solid',
    borderRadius: '12px',
    padding: '1.5rem 1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 12px rgba(191, 167, 0, 0.15)'
    }
  },
  dashboardIcon: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem'
  },
  dashboardName: {
    color: '#333',
    fontSize: '1.1rem',
    margin: '0 0 0.5rem 0',
    fontWeight: '600'
  },
  managerText: {
    color: '#666',
    fontSize: '0.85rem',
    margin: '0.5rem 0 0 0',
    fontStyle: 'italic'
  },
  loginForm: {
    marginTop: '2rem',
    textAlign: 'left',
    animation: 'fadeIn 0.5s ease'
  },
  formGroup: {
    marginBottom: '1.5rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#666',
    fontSize: '0.95rem',
    fontWeight: '500'
  },
  input: {
    width: '100%',
    padding: '0.8rem 1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    ':focus': {
      outline: 'none',
      borderColor: '#bfa700',
      boxShadow: '0 0 0 3px rgba(191, 167, 0, 0.2)'
    }
  },
  passwordContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  eyeButton: {
    position: 'absolute',
    right: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem',
    color: '#666',
    padding: '0',
    ':hover': {
      color: '#bfa700'
    }
  },
  loginButton: {
    width: '100%',
    padding: '0.8rem',
    background: '#bfa700',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      background: '#a38a00',
      transform: 'translateY(-2px)'
    },
    ':disabled': {
      background: '#ddd',
      cursor: 'not-allowed',
      transform: 'none'
    }
  },
  error: {
    color: '#e74c3c',
    fontSize: '0.9rem',
    marginBottom: '1rem',
    textAlign: 'center'
  }
};

export default SelectDashboard;