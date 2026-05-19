// src/pages/Contact.jsx
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const contactInfo = [
    { icon: '📧', label: 'Email', value: 'hello@myapp.com', href: 'mailto:hello@myapp.com' },
    { icon: '📍', label: 'Address', value: '123 Tech Street, Innovation City' },
    { icon: '📞', label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Get In Touch</h1>
        <p style={styles.subtitle}>We'd love to hear from you. Send us a message!</p>
      </div>

      <div style={styles.contentWrapper}>
        <div style={styles.infoSection}>
          <h2 style={styles.sectionTitle}>Contact Information</h2>
          <p style={styles.infoDescription}>
            Have questions? Need support? Interested in collaboration? Reach out to us through any of these channels.
          </p>
          
          <div style={styles.infoGrid}>
            {contactInfo.map((info, idx) => (
              <div key={idx} style={styles.infoCard}>
                <div style={styles.infoIcon}>{info.icon}</div>
                <div>
                  <h3 style={styles.infoLabel}>{info.label}</h3>
                  {info.href ? (
                    <a href={info.href} style={styles.infoLink}>{info.value}</a>
                  ) : (
                    <p style={styles.infoValue}>{info.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={styles.formSection}>
          {submitted && (
            <div style={styles.successMessage}>
              ✓ Thank you! We'll get back to you soon.
            </div>
          )}

          <div style={styles.formGroup}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Your name"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="your@email.com"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="What is this about?"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              style={{ ...styles.input, minHeight: '140px', resize: 'vertical' }}
              placeholder="Tell us more..."
            />
          </div>

          <button type="submit" style={styles.button}>Send Message</button>
        </form>
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
    fontSize: '1.2rem',
    opacity: '0.85',
  },
  contentWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px',
  },
  infoSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    padding: 'clamp(20px, 5vw, 35px)',
    borderRadius: '16px',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
  },
  formSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    padding: 'clamp(20px, 5vw, 35px)',
    borderRadius: '16px',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    marginBottom: '15px',
    fontWeight: '600',
  },
  infoDescription: {
    fontSize: '0.95rem',
    lineHeight: '1.6',
    opacity: '0.85',
    marginBottom: '25px',
  },
  infoGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  infoCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    padding: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  infoIcon: {
    fontSize: '1.8rem',
    minWidth: '40px',
  },
  infoLabel: {
    fontSize: '0.95rem',
    fontWeight: '600',
    marginBottom: '5px',
  },
  infoValue: {
    fontSize: '0.9rem',
    opacity: '0.8',
    margin: '0',
  },
  infoLink: {
    fontSize: '0.9rem',
    color: '#64b5f6',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '0.95rem',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    fontSize: '0.95rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: '#ffffff',
    transition: 'border-color 0.3s ease, background-color 0.3s ease',
    fontFamily: 'inherit',
  },
  button: {
    width: '100%',
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
  successMessage: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    border: '1px solid rgba(76, 175, 80, 0.4)',
    color: '#4caf50',
    padding: '12px 15px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '0.95rem',
  },
};

export default Contact;
