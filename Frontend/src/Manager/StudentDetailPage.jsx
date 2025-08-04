import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function StudentDetailPage() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost:4000/manager/getStudent/${id}`);
        const data = await response.json();
        if (response.ok) {
          setStudent(data);
        } else {
          setError(data.message || 'Failed to fetch student details');
        }
      } catch (err) {
        setError('Network error. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  useEffect(() => {
    if (student) setEditStudent(student);
  }, [student]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditStudent(student);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitEdit = async () => {
    try {
      const response = await fetch(`http://localhost:4000/manager/updateStudent/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editStudent)
      });
      const data = await response.json();
      if (response.ok) {
        setStudent(data.student);
        setIsEditing(false);
      } else {
        alert(data.message || 'Failed to update student');
      }
    } catch (err) {
      alert('Network error. Please try again later.');
    }
  };

  if (loading) return <div style={styles.statusContainer}>Loading...</div>;
  if (error) return <div style={styles.statusContainer}>{error}</div>;
  if (!student) return <div style={styles.statusContainer}>No student found</div>;

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
        <h2 style={styles.title}>Student Details</h2>
        
        <div style={styles.form}>
          <div style={styles.formGrid}>
            {/* Photo Column - Now on the left */}
            <div style={styles.photoColumn}>
              <div style={styles.photoContainer}>
                <div style={styles.photoPlaceholder}>
                  <span style={styles.photoText}>Student Photo</span>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Mobile Number 1 (WhatsApp)</label>
                <input
                  type="tel"
                  name="MobileNumber1"
                  value={isEditing ? editStudent?.MobileNumber1 || '' : student.MobileNumber1 || ''}
                  readOnly={!isEditing}
                  style={styles.input}
                  onChange={isEditing ? handleInputChange : undefined}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Mobile Number 2</label>
                <input
                  type="tel"
                  name="MobileNumber2"
                  value={isEditing ? editStudent?.MobileNumber2 || '' : student.MobileNumber2 || ''}
                  readOnly={!isEditing}
                  style={styles.input}
                  onChange={isEditing ? handleInputChange : undefined}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Date of Removal</label>
                <input
                  type="date"
                  name="DateOfRemoval"
                  value={isEditing ? editStudent?.DateOfRemoval || '' : student.DateOfRemoval || ''}
                  readOnly={!isEditing}
                  style={styles.input}
                  onChange={isEditing ? handleInputChange : undefined}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Related Documents</label>
                <textarea
                  name="RelatedDocuments"
                  value={isEditing ? editStudent?.RelatedDocuments || '' : student.RelatedDocuments || ''}
                  readOnly={!isEditing}
                  style={{ ...styles.input, minHeight: '80px' }}
                  onChange={isEditing ? handleInputChange : undefined}
                />
              </div>
            </div>

            {/* Left Column (now middle) */}
            <div style={styles.formColumn}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Sr No</label>
                <input
                  type="number"
                  name="SrNo"
                  value={isEditing ? editStudent?.SrNo || '' : student.SrNo || ''}
                  readOnly={!isEditing}
                  style={styles.input}
                  onChange={isEditing ? handleInputChange : undefined}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Name</label>
                <input
                  type="text"
                  name="Name"
                  value={isEditing ? editStudent?.Name || '' : student.Name || ''}
                  readOnly={!isEditing}
                  style={styles.input}
                  onChange={isEditing ? handleInputChange : undefined}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Father's Name</label>
                <input
                  type="text"
                  name="FatherName"
                  value={isEditing ? editStudent?.FatherName || '' : student.FatherName || ''}
                  readOnly={!isEditing}
                  style={styles.input}
                  onChange={isEditing ? handleInputChange : undefined}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Mother's Name</label>
                <input
                  type="text"
                  name="MotherName"
                  value={isEditing ? editStudent?.MotherName || '' : student.MotherName || ''}
                  readOnly={!isEditing}
                  style={styles.input}
                  onChange={isEditing ? handleInputChange : undefined}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Class</label>
                <select
                  value={isEditing ? editStudent?.Class || '' : student.Class || ''}
                  name="Class"
                  disabled={!isEditing}
                  style={{
                    padding: '0.8rem',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '1rem',
                    width: '100%',
                    backgroundColor: isEditing ? '#f9f9f9' : '#eee',
                    cursor: isEditing ? 'pointer' : 'not-allowed'
                  }}
                  onChange={isEditing ? handleInputChange : undefined}
                >
                  <option value="">Select Class</option>
                  <option value="Nursery">Nursery</option>
                  <option value="LKG">LKG</option>
                  <option value="UKG">UKG</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i+1} value={String(i+1)}>{i+1}</option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Section</label>
                <input
                  type="text"
                  name="Section"
                  value={isEditing ? editStudent?.Section || '' : student.Section || ''}
                  readOnly={!isEditing}
                  style={styles.input}
                  onChange={isEditing ? handleInputChange : undefined}
                />
              </div>
            </div>

            {/* Right Column */}
            <div style={styles.formColumn}>
              <div style={styles.formGroup}>
                <label style={styles.label}>PEN Number</label>
                <input
                  type="text"
                  name="PENNumber"
                  value={isEditing ? editStudent?.PENNumber || '' : student.PENNumber || ''}
                  readOnly={!isEditing}
                  style={styles.input}
                  onChange={isEditing ? handleInputChange : undefined}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Date of Admission</label>
                <input
                  type="date"
                  name="DateOfAdmission"
                  value={isEditing ? editStudent?.DateOfAdmission || '' : student.DateOfAdmission || ''}
                  readOnly={!isEditing}
                  style={styles.input}
                  onChange={isEditing ? handleInputChange : undefined}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Class of Admission</label>
                <input
                  type="text"
                  name="ClassOfAdmission"
                  value={isEditing ? editStudent?.ClassOfAdmission || '' : student.ClassOfAdmission || ''}
                  readOnly={!isEditing}
                  style={styles.input}
                  onChange={isEditing ? handleInputChange : undefined}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Date of Birth</label>
                <input
                  type="date"
                  name="DateOfBirth"
                  value={isEditing ? editStudent?.DateOfBirth || '' : student.DateOfBirth || ''}
                  readOnly={!isEditing}
                  style={styles.input}
                  onChange={isEditing ? handleInputChange : undefined}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Address</label>
                <textarea
                  name="Address"
                  value={isEditing ? editStudent?.Address || '' : student.Address || ''}
                  readOnly={!isEditing}
                  style={{ ...styles.input, minHeight: '80px' }}
                  onChange={isEditing ? handleInputChange : undefined}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Aadhar Number</label>
                <input
                  type="text"
                  name="AadharNumber"
                  value={isEditing ? editStudent?.AadharNumber || '' : student.AadharNumber || ''}
                  readOnly={!isEditing}
                  style={styles.input}
                  onChange={isEditing ? handleInputChange : undefined}
                />
              </div>
            </div>
          </div>
        </div>
        {!isEditing ? (
          <button onClick={handleEditClick} style={{ marginTop: '2rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '8px', padding: '0.8rem 2rem', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}>Edit</button>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'center' }}>
            <button onClick={handleCancelEdit} style={{ background: '#e74c3c', color: 'white', border: 'none', borderRadius: '8px', padding: '0.8rem 2rem', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}>Cancel</button>
            <button onClick={handleSubmitEdit} style={{ background: '#2ecc40', color: 'white', border: 'none', borderRadius: '8px', padding: '0.8rem 2rem', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}>Submit Changes</button>
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
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem'
  },
  title: {
    color: '#bfa700',
    fontSize: '1.8rem',
    margin: '1rem 0 1.5rem 0',
    fontWeight: '600',
    textAlign: 'center'
  },
  form: {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 12px rgba(191, 167, 0, 0.1)'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '0.8fr 1fr 1fr',
    gap: '2rem',
    '@media (max-width: 900px)': {
      gridTemplateColumns: '1fr'
    }
  },
  formColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  photoColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  photoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem'
  },
  photoPlaceholder: {
    width: '200px',
    height: '250px',
    border: '2px dashed #bfa700',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fffbe6'
  },
  photoText: {
    color: '#bfa700',
    fontSize: '1rem',
    fontWeight: '600'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    color: '#555',
    fontSize: '0.95rem',
    fontWeight: '500'
  },
  input: {
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
    backgroundColor: '#f9f9f9',
    cursor: 'text',
    ':focus': {
      outline: 'none',
      borderColor: '#ddd',
      boxShadow: 'none'
    }
  },
  statusContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '1.2rem',
    color: '#555'
  }
};

export default StudentDetailPage;