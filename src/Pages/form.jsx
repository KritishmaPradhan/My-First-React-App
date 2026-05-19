import { useState, useEffect } from 'react';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [submissions, setSubmissions] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showSubmissions, setShowSubmissions] = useState(false);

  useEffect(() => {
    const storedSubmissions = localStorage.getItem('formSubmissions');
    if (storedSubmissions) {
      try {
        setSubmissions(JSON.parse(storedSubmissions));
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setMessage({ text: 'All fields are required', type: 'error' });
      return false;
    }
    if (formData.password.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters', type: 'error' });
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      return;
    }

    const newSubmission = {
      id: Date.now(),
      username: formData.username,
      email: formData.email,
      timestamp: new Date().toLocaleString(),
    };

    const updatedSubmissions = [...submissions, newSubmission];
    setSubmissions(updatedSubmissions);
    localStorage.setItem('formSubmissions', JSON.stringify(updatedSubmissions));

    setMessage({ text: 'Registration successful!', type: 'success' });
    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const handleDeleteSubmission = (id) => {
    const updatedSubmissions = submissions.filter(sub => sub.id !== id);
    setSubmissions(updatedSubmissions);
    localStorage.setItem('formSubmissions', JSON.stringify(updatedSubmissions));
    setMessage({ text: 'Submission deleted', type: 'info' });
    setTimeout(() => setMessage({ text: '', type: '' }), 2000);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all submissions?')) {
      localStorage.removeItem('formSubmissions');
      setSubmissions([]);
      setMessage({ text: 'All data cleared', type: 'info' });
      setTimeout(() => setMessage({ text: '', type: '' }), 2000);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>User Registration</h1>
        <p style={styles.subtitle}>Create your account to get started</p>
      </div>

      <div style={styles.contentWrapper}>
        <div style={styles.formWrapper}>
          {message.text && (
            <div style={{
              ...styles.message,
              backgroundColor: message.type === 'success' ? 'rgba(76, 175, 80, 0.2)' : 
                             message.type === 'error' ? 'rgba(244, 67, 54, 0.2)' : 'rgba(33, 150, 243, 0.2)',
              borderColor: message.type === 'success' ? '#4caf50' : 
                          message.type === 'error' ? '#f44336' : '#2196f3',
              color: message.type === 'success' ? '#4caf50' : 
                    message.type === 'error' ? '#f44336' : '#2196f3',
            }}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Choose a username"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Min. 6 characters"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Re-enter password"
                style={styles.input}
                required
              />
            </div>

            <button type="submit" style={styles.submitBtn}>
              Create Account
            </button>
          </form>
        </div>

        {submissions.length > 0 && (
          <div style={styles.submissionsWrapper}>
            <div style={styles.submissionsHeader}>
              <h2 style={styles.submissionsTitle}>Recent Registrations</h2>
              <button 
                onClick={() => setShowSubmissions(!showSubmissions)}
                style={styles.toggleBtn}
              >
                {showSubmissions ? '▼' : '▶'} {submissions.length}
              </button>
            </div>

            {showSubmissions && (
              <div style={styles.submissionsList}>
                {submissions.map(submission => (
                  <div key={submission.id} style={styles.submissionCard}>
                    <div style={styles.submissionInfo}>
                      <h3 style={styles.submissionUsername}>{submission.username}</h3>
                      <p style={styles.submissionEmail}>{submission.email}</p>
                      <p style={styles.submissionTime}>{submission.timestamp}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteSubmission(submission.id)}
                      style={styles.deleteBtn}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {submissions.length > 0 && (
                  <button 
                    onClick={handleClearAll}
                    style={styles.clearAllBtn}
                  >
                    Clear All
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '60px 20px',
    maxWidth: '1100px',
    margin: '0 auto',
    color: '#ffffff',
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px',
  },
  heading: {
    fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
    marginBottom: '10px',
    textShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: '1.1rem',
    opacity: '0.85',
  },
  contentWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '30px',
  },
  formWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    padding: 'clamp(30px, 5vw, 40px)',
    borderRadius: '16px',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
  },
  message: {
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '0.95rem',
    border: '1px solid',
    animation: 'slideIn 0.3s ease',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '0.95rem',
    fontWeight: '600',
    marginBottom: '8px',
  },
  input: {
    padding: '12px 15px',
    fontSize: '0.95rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: '#ffffff',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },
  submitBtn: {
    padding: '12px 20px',
    fontSize: '1rem',
    fontWeight: '600',
    backgroundColor: 'rgba(100, 181, 246, 0.9)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '10px',
  },
  submissionsWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    padding: 'clamp(30px, 5vw, 40px)',
    borderRadius: '16px',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
  },
  submissionsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  submissionsTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    margin: '0',
  },
  toggleBtn: {
    padding: '8px 12px',
    fontSize: '0.9rem',
    backgroundColor: 'rgba(100, 181, 246, 0.3)',
    border: '1px solid rgba(100, 181, 246, 0.5)',
    borderRadius: '6px',
    color: '#64b5f6',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  submissionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  submissionCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  submissionInfo: {
    flex: '1',
  },
  submissionUsername: {
    fontSize: '1rem',
    fontWeight: '600',
    margin: '0 0 5px 0',
  },
  submissionEmail: {
    fontSize: '0.85rem',
    color: '#64b5f6',
    margin: '0 0 5px 0',
  },
  submissionTime: {
    fontSize: '0.75rem',
    opacity: '0.6',
    margin: '0',
  },
  deleteBtn: {
    padding: '8px 12px',
    fontSize: '1rem',
    backgroundColor: 'rgba(244, 67, 54, 0.3)',
    border: '1px solid rgba(244, 67, 54, 0.5)',
    borderRadius: '6px',
    color: '#f44336',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  clearAllBtn: {
    width: '100%',
    padding: '10px',
    marginTop: '15px',
    fontSize: '0.9rem',
    fontWeight: '500',
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
    border: '1px solid rgba(244, 67, 54, 0.4)',
    borderRadius: '8px',
    color: '#f44336',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export default FormComponent;
