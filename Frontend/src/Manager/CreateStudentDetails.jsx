import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function CreateStudentDetails() {
  const [formData, setFormData] = useState({
    SrNo: '',
    Name: '',
    FatherName: '',
    MotherName: '',
    Class: '',
    Section: '',
    PENNumber: '',
    DateOfAdmission: '',
    ClassOfAdmission: '',
    DateOfBirth: '',
    Address: '',
    AadharNumber: '',
    RelatedDocuments: '',
    MobileNumber1: '',
    MobileNumber2: '',
    DateOfRemoval: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      SrNo: '',
      Name: '',
      FatherName: '',
      MotherName: '',
      Class: '',
      Section: '',
      PENNumber: '',
      DateOfAdmission: '',
      ClassOfAdmission: '',
      DateOfBirth: '',
      Address: '',
      AadharNumber: '',
      RelatedDocuments: '',
      MobileNumber1: '',
      MobileNumber2: '',
      DateOfRemoval: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.SrNo || !formData.Name) {
      toast.error('Sr No and Name are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/manager/createStudent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          SrNo: Number(formData.SrNo)
        })
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Student created successfully!');
        resetForm();
      } else {
        toast.error(data.message || 'Error creating student');
      }
    } catch (err) {
      toast.error('Network error');
    }
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
        <h2 style={styles.title}>Add a Student</h2>
        
        <form onSubmit={handleSubmit} style={styles.form}>
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
                  value={formData.MobileNumber1}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Mobile Number 2</label>
                <input
                  type="tel"
                  name="MobileNumber2"
                  value={formData.MobileNumber2}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Date of Removal</label>
                <input
                  type="date"
                  name="DateOfRemoval"
                  value={formData.DateOfRemoval}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Related Documents</label>
                <textarea
                  name="RelatedDocuments"
                  value={formData.RelatedDocuments}
                  onChange={handleChange}
                  style={{ ...styles.input, minHeight: '80px' }}
                />
              </div>
            </div>

            {/* Left Column (now middle) */}
            <div style={styles.formColumn}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Sr No*</label>
                <input
                  type="number"
                  name="SrNo"
                  value={formData.SrNo}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Name*</label>
                <input
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Father's Name</label>
                <input
                  type="text"
                  name="FatherName"
                  value={formData.FatherName}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Mother's Name</label>
                <input
                  type="text"
                  name="MotherName"
                  value={formData.MotherName}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Class</label>
                <select
                  name="Class"
                  value={formData.Class}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">Select Class</option>
                  <option value="Nursery">Nursery</option>
                  <option value="LKG">LKG</option>
                  <option value="UKG">UKG</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i} value={i+1}>{i+1}</option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Section</label>
                <select
                  name="Section"
                  value={formData.Section}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">Select Section</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div style={styles.formColumn}>
              <div style={styles.formGroup}>
                <label style={styles.label}>PEN Number</label>
                <input
                  type="text"
                  name="PENNumber"
                  value={formData.PENNumber}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Date of Admission</label>
                <input
                  type="date"
                  name="DateOfAdmission"
                  value={formData.DateOfAdmission}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Class of Admission</label>
                <select
                  name="ClassOfAdmission"
                  value={formData.ClassOfAdmission}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">Select Class</option>
                  <option value="Nursery">Nursery</option>
                  <option value="LKG">LKG</option>
                  <option value="UKG">UKG</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i} value={i+1}>{i+1}</option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Date of Birth</label>
                <input
                  type="date"
                  name="DateOfBirth"
                  value={formData.DateOfBirth}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Address</label>
                <textarea
                  name="Address"
                  value={formData.Address}
                  onChange={handleChange}
                  style={{ ...styles.input, minHeight: '80px' }}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Aadhar Number</label>
                <input
                  type="text"
                  name="AadharNumber"
                  value={formData.AadharNumber}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>
          </div>

          <div style={styles.buttonContainer}>
            <button
              type="submit"
              style={styles.submitButton}
            >
              Create Student
            </button>
          </div>
        </form>
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
    ':focus': {
      outline: 'none',
      borderColor: '#bfa700',
      boxShadow: '0 0 0 3px rgba(191, 167, 0, 0.1)'
    }
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem'
  },
  submitButton: {
    background: '#bfa700',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.8rem 2rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      background: '#a38a00',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(191, 167, 0, 0.3)'
    }
  }
};

export default CreateStudentDetails;