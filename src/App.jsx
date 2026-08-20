import React, { useState } from 'react';

// Automatically import all student JSON files in the folder
const studentFiles = import.meta.glob('./data/students/*.json', { eager: true });
const allStudents = Object.entries(studentFiles)
  .filter(([path]) => !path.includes('_template.json'))
  .map(([_, module]) => module.default || module);

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = allStudents.filter(student =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.header}>
        <h1 style={styles.title}>GitHub Actions Workshop</h1>
        <p style={styles.subtitle}>
          An interactive hub built live by workshop participants using Git & GitHub Pull Requests.
        </p>

        {/* Stats & Search Bar */}
        <div style={styles.statsBar}>
          <span style={styles.counterText}>
            👥 Total Contributors: <strong>{allStudents.length}</strong>
          </span>
          <input
            type="text"
            placeholder="🔍 Search by name or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </header>

      {/* Cards Grid */}
      <div style={styles.grid}>
        {filteredStudents.map((student, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.avatar}>
              {student.name ? student.name.charAt(0).toUpperCase() : '👨‍💻'}
            </div>
            <h3 style={styles.studentName}>{student.name}</h3>
            <span style={styles.studentRole}>{student.role}</span>
            <p style={styles.studentBio}>"{student.bio || 'Tech Enthusiast'}"</p>

            <div style={styles.linksContainer}>
              {student.linkedin && (
                <a
                  href={student.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  style={{ ...styles.btn, backgroundColor: '#0A66C2' }}
                >
                  LinkedIn
                </a>
              )}
              {student.github && (
                <a
                  href={student.github}
                  target="_blank"
                  rel="noreferrer"
                  style={{ ...styles.btn, backgroundColor: '#24292f' }}
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Clean Modern Light Mode Styles
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f6f8fa',
    color: '#24292f',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    padding: '40px 20px',
    direction: 'ltr'
  },
  header: {
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto 40px auto'
  },
  title: {
    fontSize: '36px',
    fontWeight: '800',
    color: '#0969da',
    margin: '0 0 12px 0',
    letterSpacing: '-0.5px'
  },
  subtitle: {
    fontSize: '16px',
    color: '#57606a',
    lineHeight: '1.6'
  },
  statsBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px',
    marginTop: '25px',
    padding: '16px 24px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #d0d7de',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
  },
  counterText: {
    fontSize: '15px',
    color: '#24292f'
  },
  searchInput: {
    padding: '10px 16px',
    borderRadius: '8px',
    border: '1px solid #d0d7de',
    backgroundColor: '#f6f8fa',
    color: '#24292f',
    outline: 'none',
    fontSize: '14px',
    minWidth: '240px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #d0d7de',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(140,149,159,0.1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  },
  avatar: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#0969da',
    color: '#ffffff',
    fontSize: '26px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    marginBottom: '16px'
  },
  studentName: {
    margin: '0 0 6px 0',
    color: '#24292f',
    fontSize: '20px',
    fontWeight: '700'
  },
  studentRole: {
    fontSize: '13px',
    color: '#1a7f37',
    marginBottom: '12px',
    fontWeight: '600'
  },
  studentBio: {
    fontSize: '14px',
    color: '#57606a',
    fontStyle: 'italic',
    marginBottom: '20px',
    flexGrow: 1,
    lineHeight: '1.5'
  },
  linksContainer: {
    display: 'flex',
    gap: '10px',
    width: '100%'
  },
  btn: {
    flex: 1,
    padding: '10px 14px',
    borderRadius: '8px',
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: '600',
    textAlign: 'center'
  }
};