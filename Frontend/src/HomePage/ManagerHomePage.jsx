import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ManagerHomePage() {
  const [selectedDashboard, setSelectedDashboard] = useState(null);
  const navigate = useNavigate();

  const dashboards = [
    { id: 'studentDashboard', name: 'Student Fees', icon: '📊', manager: 'Academic Manager' },
    { id: 'transportDashboard', name: 'Transport Fees', icon: '🚌', manager: 'Transport Manager' },
    { id: 'reportDashboard', name: 'Report Card', icon: '📝', manager: 'Examination Manager' },
    { id: 'mkTradersDashboard', name: 'MK Traders', icon: '🏢', manager: 'Business Manager' }
  ];

  const handleDashboardSelect = (dashboardId) => {
    setSelectedDashboard(dashboardId);
    navigate(`/${dashboardId}`);
  };

  const handleCreateUpdateManagers = () => {
    navigate('/createUpdateManager');
  };

  const handleStudentDetails = () => {
    navigate('/studentDetails');
  };

  const handleSchoolFeesDetails = () => {
    navigate('/schoolFeesDetails');
  };

  const handleTransportFeesDetails = () => {
    navigate('/transportFeesDetails');
  };

  const handleLogout = () => {
    fetch('http://127.0.0.1:4000/auth/logout', {
      method: 'POST',
      credentials: 'include'
    })
    .then(response => {
      if (response.ok) {
        toast.success('Logged out successfully');
        window.location.href = '/';
      } else {
        console.error('Logout failed');
      }
    })
    .catch(error => {
      console.error('Network error:', error);
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header with logo and school name */}
        <div style={styles.header}>
          <div style={styles.logoContainer}>
            <img 
              src="/VantageLogo.jpg" 
              alt="School Logo" 
              style={styles.logo} 
            />
            <h1 style={styles.schoolName}>Vantage Convent School</h1>
          </div>
          <button
            onClick={handleLogout}
            style={styles.logoutButton}
          >
            Logout
          </button>
        </div>

        <div style={styles.mainContent}>
          <h2 style={styles.title}>Choose Dashboard</h2>
          <p style={styles.subtitle}>Select a dashboard to manage</p>
          
          <div style={styles.dashboardRow}>
            {dashboards.map((dashboard) => (
              <div
                key={dashboard.id}
                style={{
                  ...styles.dashboardCard,
                  borderColor: selectedDashboard === dashboard.id ? '#bfa700' : '#ffe066',
                  backgroundColor: selectedDashboard === dashboard.id ? '#fffbe6' : 'white'
                }}
                onClick={() => handleDashboardSelect(dashboard.id)}
              >
                <div style={styles.dashboardIcon}>{dashboard.icon}</div>
                <h3 style={styles.dashboardName}>{dashboard.name}</h3>
                <p style={styles.managerText}>Managed by: {dashboard.manager}</p>
              </div>
            ))}
          </div>

          <div style={styles.actionButtonsContainer}>
            <button
              onClick={handleCreateUpdateManagers}
              style={styles.managerButton}
            >
              Create/Update Managers
            </button>
            <button
              onClick={handleStudentDetails}
              style={styles.studentDetailsButton}
            >
              Student Details
            </button>
            <button
              onClick={handleSchoolFeesDetails}
              style={styles.schoolFeesButton}
            >
              School Fees Details
            </button>
            <button
              onClick={handleTransportFeesDetails}
              style={styles.transportFeesButton}
            >
              Transport Fees Details
            </button>
          </div>
        </div>
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
    width: '100%',
    maxWidth: '1200px',
    textAlign: 'center'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    position: 'relative'
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
  logoutButton: {
    background: 'transparent',
    color: '#bfa700',
    border: '2px solid #bfa700',
    borderRadius: '24px',
    padding: '0.5rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      background: '#bfa700',
      color: 'white'
    }
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
  dashboardRow: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '2rem',
    marginBottom: '3rem',
    width: '100%'
  },
  dashboardCard: {
    border: '2px solid',
    borderRadius: '12px',
    padding: '1.5rem 1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minWidth: '200px',
    flex: '1',
    maxWidth: '250px',
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
  actionButtonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    width: '100%',
    maxWidth: '1000px',
    margin: '0 auto',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    padding: '0.5rem 0',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '::-webkit-scrollbar': {
      display: 'none'
    }
  },
  managerButton: {
    flex: '1 0 auto',
    minWidth: '200px',
    padding: '1rem',
    background: '#bfa700',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 8px rgba(191, 167, 0, 0.2)',
    ':hover': {
      background: '#a38a00',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 12px rgba(191, 167, 0, 0.3)'
    }
  },
  studentDetailsButton: {
    flex: '1 0 auto',
    minWidth: '200px',
    padding: '1rem',
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 8px rgba(231, 76, 60, 0.2)',
    ':hover': {
      background: '#c0392b',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 12px rgba(231, 76, 60, 0.3)'
    }
  },
  schoolFeesButton: {
    flex: '1 0 auto',
    minWidth: '200px',
    padding: '1rem',
    background: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 8px rgba(52, 152, 219, 0.2)',
    ':hover': {
      background: '#2980b9',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 12px rgba(52, 152, 219, 0.3)'
    }
  },
  transportFeesButton: {
    flex: '1 0 auto',
    minWidth: '200px',
    padding: '1rem',
    background: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 8px rgba(46, 204, 113, 0.2)',
    ':hover': {
      background: '#27ae60',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 12px rgba(46, 204, 113, 0.3)'
    }
  }
};

export default ManagerHomePage;