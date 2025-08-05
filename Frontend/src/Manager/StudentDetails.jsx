import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentDetails() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:4000/manager/getStudents');
        const data = await response.json();
        if (response.ok) {
          setStudents(data);
        } else {
          setError(data.message || 'Failed to fetch student data');
        }
      } catch (err) {
        setError('Network error. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleCreateStudent = () => {
    navigate('/createStudent');
  };

  const handleStudentClick = (id) => {
    navigate(`/studentDetails/${id}`);
  };

  return (
    <div style={styles.container}>
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
          onClick={() => navigate(-1)}
          style={styles.backButton}
        >
          Back
        </button>
      </div>

      <div style={styles.content}>
        <div style={styles.titleContainer}>
          <h2 style={styles.title}>Student Details</h2>
          <button
            onClick={handleCreateStudent}
            style={styles.createButton}
          >
            Add Student
          </button>
        </div>
        
        {loading ? (
          <div style={styles.statusContainer}>
            <p style={styles.loadingText}>Loading student data...</p>
          </div>
        ) : error ? (
          <div style={styles.statusContainer}>
            <p style={styles.errorText}>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              style={styles.retryButton}
            >
              Retry
            </button>
          </div>
        ) : students.length === 0 ? (
          <div style={styles.statusContainer}>
            <p style={styles.emptyText}>No student records found</p>
          </div>
        ) : (
          <div style={styles.studentsList}>
            {students.map(student => (
              <div key={student._id} style={styles.studentCard} onClick={() => handleStudentClick(student._id)}>
                <div style={styles.cardContent}>
                  <span style={styles.detailLabel}>Sr No:</span>
                  <span style={styles.detailValue}>{student.SrNo}</span>
                  
                  <span style={styles.detailLabel}>Name:</span>
                  <span style={styles.detailValue}>{student.Name}</span>
                  
                  <span style={styles.detailLabel}>Class:</span>
                  <span style={styles.detailValue}>{student.Class}-{student.Section}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #fffbe6 0%, #fff 100%)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '0 2rem 2rem 2rem'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 0',
    borderBottom: '2px solid #ffe066',
    marginBottom: '1.5rem',
    background: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 8px rgba(191, 167, 0, 0.08)'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginLeft: '2rem'
  },
  logo: {
    height: '50px',
    width: 'auto',
    borderRadius: '50%',
    border: '2px solid #ffe066'
  },
  schoolName: {
    color: '#bfa700',
    fontSize: '1.5rem',
    margin: 0,
    fontWeight: '600',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
  },
  backButton: {
    background: 'transparent',
    color: '#bfa700',
    border: '2px solid #bfa700',
    borderRadius: '24px',
    padding: '0.5rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginRight: '2rem',
    ':hover': {
      background: '#bfa700',
      color: 'white'
    }
  },
  content: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 1rem'
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '1rem 0 1.5rem 0',
    padding: '0 1rem'
  },
  title: {
    color: '#bfa700',
    fontSize: '1.8rem',
    fontWeight: '600',
    margin: 0
  },
  createButton: {
    background: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '24px',
    padding: '0.5rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      background: '#27ae60',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(46, 204, 113, 0.3)'
    }
  },
  statusContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(191, 167, 0, 0.1)',
    margin: '1rem'
  },
  loadingText: {
    color: '#666',
    fontSize: '1.1rem'
  },
  errorText: {
    color: '#e74c3c',
    fontSize: '1.1rem',
    marginBottom: '1rem'
  },
  retryButton: {
    background: '#bfa700',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      background: '#a38a00'
    }
  },
  emptyText: {
    color: '#666',
    fontSize: '1.1rem',
    fontStyle: 'italic'
  },
  studentsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    padding: '0 1rem'
  },
  studentCard: {
    background: 'white',
    borderRadius: '8px',
    padding: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease',
    borderLeft: '4px solid #bfa700',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateX(2px)',
      boxShadow: '0 3px 6px rgba(0,0,0,0.15)'
    }
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  detailLabel: {
    fontWeight: '600',
    color: '#bfa700',
    fontSize: '0.9rem'
  },
  detailValue: {
    color: '#555',
    fontSize: '0.9rem',
    marginRight: '1rem'
  }
};

export default StudentDetails;