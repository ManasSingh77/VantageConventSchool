import React, { useState, useEffect } from 'react';

function CreateUpdateManager() {
  const [type, setType] = useState('school-fees');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: '', isError: false });
  const [managers, setManagers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:4000/manager/getManagers');
      const data = await response.json();
      if (response.ok) {
        setManagers(data);
      } else {
        setMessage({ text: data.message || 'Error fetching managers', isError: true });
      }
    } catch (err) {
      setMessage({ text: 'Network error', isError: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', isError: false });
    setIsLoading(true);
    
    if (!username || !password) {
      setMessage({ text: 'Username and password are required', isError: true });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:4000/manager/createManager', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, username, password })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage({ text: 'Manager created successfully!', isError: false });
        setUsername('');
        setPassword('');
        fetchManagers();
      } else {
        setMessage({ text: data.message || 'Error occurred', isError: true });
      }
    } catch (err) {
      setMessage({ text: 'Network error', isError: true });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this manager?')) return;
    
    try {
      const response = await fetch(`http://127.0.0.1:4000/manager/deleteManager/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (response.ok) {
        setMessage({ text: 'Manager deleted successfully', isError: false });
        fetchManagers();
      } else {
        setMessage({ text: data.message || 'Error deleting manager', isError: true });
      }
    } catch (err) {
      setMessage({ text: 'Network error', isError: true });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.logoContainer}>
          <img 
            src="/VantageLogo.jpg" 
            alt="School Logo" 
            style={styles.logo} 
          />
          <h1 style={styles.schoolName}>Vantage Convent School</h1>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.formCard}>
          <h2 style={styles.title}>Create/Update Manager</h2>
          
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Manager Type:</label>
              <select 
                value={type} 
                onChange={e => setType(e.target.value)} 
                style={styles.select}
              >
                <option value="school-fees">Student Fees Manager</option>
                <option value="transport-fees">Transport Fees Manager</option>
                <option value="report-card">Report Card Manager</option>
                <option value="mk-traders">MK Traders Manager</option>
              </select>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Username:</label>
              <div style={styles.inputContainer}>
                <input 
                  type="text" 
                  value={username} 
                  onChange={e => setUsername(e.target.value)} 
                  style={styles.input} 
                  placeholder="Enter username"
                />
              </div>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Password:</label>
              <div style={styles.inputContainer}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  style={styles.input} 
                  placeholder="Enter password"
                />
                <button 
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={styles.eyeButton}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>
            
            <div style={styles.buttonContainer}>
              <button 
                type="submit" 
                style={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Create Manager'}
              </button>
            </div>
          </form>

          {message.text && (
            <p style={{ ...styles.message, color: message.isError ? '#e74c3c' : '#2ecc71' }}>
              {message.text}
            </p>
          )}
        </div>

        <div style={styles.managersList}>
          <h3 style={styles.subTitle}>Existing Managers</h3>
          
          {managers.length === 0 ? (
            <p style={styles.noManagers}>No managers found</p>
          ) : (
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeaderRow}>
                    <th style={styles.tableHeader}>Username</th>
                    <th style={styles.tableHeader}>Type</th>
                    <th style={styles.tableHeader}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {managers.map(manager => (
                    <tr key={manager._id} style={styles.tableRow}>
                      <td style={styles.tableCell}>{manager.username}</td>
                      <td style={styles.tableCell}>
                        {manager.type === 'school-fees' && 'Student Fees'}
                        {manager.type === 'transport-fees' && 'Transport Fees'}
                        {manager.type === 'report-card' && 'Report Card'}
                        {manager.type === 'mk-traders' && 'MK Traders'}
                      </td>
                      <td style={styles.tableCell}>
                        <button 
                          onClick={() => handleDelete(manager._id)} 
                          style={styles.deleteButton}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #fffbe6 0%, #fff 100%)',
    padding: '2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem'
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
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '1000px',
    margin: '0 auto',
    gap: '2rem'
  },
  formCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 12px rgba(191, 167, 0, 0.1)',
    width: '100%',
    maxWidth: '500px'
  },
  title: {
    color: '#bfa700',
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
    fontWeight: '600'
  },
  subTitle: {
    color: '#bfa700',
    fontSize: '1.5rem',
    marginBottom: '1rem',
    textAlign: 'center',
    fontWeight: '600'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    width: '100%'
  },
  label: {
    color: '#555',
    fontSize: '1rem',
    fontWeight: '500'
  },
  select: {
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    backgroundColor: 'white',
    width: '100%',
    boxSizing: 'border-box',
    ':focus': {
      outline: 'none',
      borderColor: '#bfa700',
      boxShadow: '0 0 0 3px rgba(191, 167, 0, 0.1)'
    }
  },
  inputContainer: {
    position: 'relative',
    width: '100%'
  },
  input: {
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box',
    ':focus': {
      outline: 'none',
      borderColor: '#bfa700',
      boxShadow: '0 0 0 3px rgba(191, 167, 0, 0.1)'
    }
  },
  eyeButton: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
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
  buttonContainer: {
    width: '100%'
  },
  submitButton: {
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
      background: '#a38a00'
    },
    ':disabled': {
      background: '#ddd',
      cursor: 'not-allowed'
    }
  },
  message: {
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '0.9rem'
  },
  managersList: {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 12px rgba(191, 167, 0, 0.1)',
    width: '100%'
  },
  noManagers: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic'
  },
  tableContainer: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeaderRow: {
    backgroundColor: '#fffbe6'
  },
  tableHeader: {
    padding: '1rem',
    textAlign: 'left',
    color: '#bfa700',
    borderBottom: '2px solid #ffe066'
  },
  tableRow: {
    ':nth-child(even)': {
      backgroundColor: '#fffdf6'
    },
    ':hover': {
      backgroundColor: '#fffbe6'
    }
  },
  tableCell: {
    padding: '1rem',
    borderBottom: '1px solid #eee',
    verticalAlign: 'middle'
  },
  deleteButton: {
    background: '#e74c3c',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      background: '#c0392b'
    }
  }
};

export default CreateUpdateManager;