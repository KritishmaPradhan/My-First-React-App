// src/pages/About.jsx
const About = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>About Us</h1>
        <p style={styles.subtitle}>Building innovative digital solutions</p>
      </div>
      <div style={styles.content}>
        <section style={styles.section}>
          <p style={styles.introText}>
            We're a team of passionate developers committed to creating beautiful, functional, and intuitive digital experiences that solve real-world problems.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>🎯 Our Mission</h2>
          <p style={styles.text}>
            To deliver cutting-edge web applications that combine modern technology with clean, user-centric design. We focus on creating solutions that matter.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>💼 What We Do</h2>
          <div style={styles.gridContainer}>
            {[
              { icon: '💻', title: 'Full-stack Development', desc: 'React, modern frameworks, and scalable solutions' },
              { icon: '🎨', title: 'UI/UX Design', desc: 'Beautiful, responsive, and intuitive interfaces' },
              { icon: '⚡', title: 'High Performance', desc: 'Fast, optimized, and efficient applications' },
              { icon: '🔒', title: 'Secure Solutions', desc: 'Reliable, secure, and scalable systems' },
            ].map((item, idx) => (
              <div key={idx} style={styles.card}>
                <div style={styles.cardIcon}>{item.icon}</div>
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.cardText}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>✨ Our Values</h2>
          <div style={styles.valuesGrid}>
            <div style={styles.valueItem}>Innovation</div>
            <div style={styles.valueItem}>Quality</div>
            <div style={styles.valueItem}>Excellence</div>
            <div style={styles.valueItem}>Learning</div>
          </div>
        </section>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '60px 20px',
    maxWidth: '900px',
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
    fontWeight: '300',
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    padding: 'clamp(30px, 5vw, 50px)',
    borderRadius: '16px',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
  },
  section: {
    marginBottom: '40px',
  },
  introText: {
    fontSize: '1.2rem',
    lineHeight: '1.9',
    opacity: '0.95',
  },
  text: {
    fontSize: '1.05rem',
    lineHeight: '1.8',
    opacity: '0.9',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    marginBottom: '25px',
    fontWeight: '600',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    padding: '25px 20px',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'transform 0.3s ease, background 0.3s ease',
    cursor: 'pointer',
    textAlign: 'center',
  },
  cardIcon: {
    fontSize: '2.5rem',
    marginBottom: '15px',
  },
  cardTitle: {
    fontSize: '1.1rem',
    marginBottom: '10px',
    fontWeight: '600',
  },
  cardText: {
    fontSize: '0.95rem',
    opacity: '0.8',
    lineHeight: '1.6',
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '15px',
  },
  valueItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    fontSize: '1.1rem',
    fontWeight: '500',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
};

export default About;
