/**
 * Run with: npm run db:seed
 * Creates tables and seeds sample portfolio data.
 */
import pool from './db'

async function seed() {
  const conn = await pool.getConnection()
  try {
    console.log('🌱 Creating tables...')

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS skills (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        category VARCHAR(100) NOT NULL,
        proficiency INT NOT NULL DEFAULT 80,
        icon VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS education (
        id INT AUTO_INCREMENT PRIMARY KEY,
        institution VARCHAR(200) NOT NULL,
        degree VARCHAR(200) NOT NULL,
        field VARCHAR(200) NOT NULL,
        start_year INT NOT NULL,
        end_year INT,
        grade VARCHAR(50),
        description TEXT,
        logo_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS experience (
        id INT AUTO_INCREMENT PRIMARY KEY,
        company VARCHAR(200) NOT NULL,
        role VARCHAR(200) NOT NULL,
        employment_type VARCHAR(100) NOT NULL DEFAULT 'Full-time',
        start_date DATE NOT NULL,
        end_date DATE,
        description TEXT NOT NULL,
        tech_stack JSON,
        logo_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS certifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(300) NOT NULL,
        issuer VARCHAR(200) NOT NULL,
        issue_date DATE NOT NULL,
        expiry_date DATE,
        credential_id VARCHAR(200),
        credential_url VARCHAR(500),
        badge_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    console.log('✅ Tables created.')

    // ─── Seed Skills ─────────────────────────────────────────────
    await conn.execute(`DELETE FROM skills`)
    const skills = [
      ['Next.js', 'Frontend', 95, 'nextjs'],
      ['React', 'Frontend', 92, 'react'],
      ['TypeScript', 'Language', 90, 'typescript'],
      ['Node.js', 'Backend', 88, 'nodejs'],
      ['MySQL', 'Database', 85, 'mysql'],
      ['Tailwind CSS', 'Frontend', 90, 'tailwind'],
      ['REST APIs', 'Backend', 88, 'api'],
      ['Git & GitHub', 'DevOps', 87, 'git'],
      ['Docker', 'DevOps', 75, 'docker'],
      ['PostgreSQL', 'Database', 80, 'postgresql'],
      ['Redis', 'Database', 70, 'redis'],
      ['AWS', 'Cloud', 72, 'aws'],
    ]
    for (const [name, category, proficiency, icon] of skills) {
      await conn.execute(
        `INSERT INTO skills (name, category, proficiency, icon) VALUES (?, ?, ?, ?)`,
        [name, category, proficiency, icon]
      )
    }

    // ─── Seed Education ──────────────────────────────────────────
    await conn.execute(`DELETE FROM education`)
    await conn.execute(
      `INSERT INTO education (institution, degree, field, start_year, end_year, grade, description) VALUES
      ('Gujarat Technological University', 'Bachelor of Engineering', 'Computer Engineering', 2019, 2023, '8.4 CGPA', 'Focused on software engineering, algorithms, data structures, and full-stack development. Final year project: AI-powered job recommendation platform.'),
      ('Higher Secondary School', 'HSC (12th)', 'Science (PCM + CS)', 2017, 2019, '85%', 'Studied Physics, Chemistry, Mathematics with Computer Science elective.')`
    )

    // ─── Seed Experience ─────────────────────────────────────────
    await conn.execute(`DELETE FROM experience`)
    await conn.execute(
      `INSERT INTO experience (company, role, employment_type, start_date, end_date, description, tech_stack) VALUES
      ('TechCorp Solutions', 'Full Stack Developer', 'Full-time', '2023-07-01', NULL,
       'Building and maintaining scalable web applications for enterprise clients. Lead developer for internal HR portal serving 500+ employees. Reduced API response times by 40% through query optimization.',
       '["Next.js", "TypeScript", "MySQL", "Redis", "Docker"]'),
      ('WebWave Agency', 'Frontend Developer Intern', 'Internship', '2023-01-01', '2023-06-30',
       'Developed responsive UI components using React and Tailwind CSS. Collaborated with design team to implement pixel-perfect interfaces. Built 3 client-facing landing pages.',
       '["React", "Tailwind CSS", "JavaScript", "Figma"]'),
      ('Freelance', 'Full Stack Developer', 'Freelance', '2022-06-01', '2022-12-31',
       'Delivered 5 web projects for local businesses including e-commerce stores, portfolio sites, and booking systems. Managed full project lifecycle from requirements to deployment.',
       '["Next.js", "Node.js", "MySQL", "Stripe API"]')`
    )

    // ─── Seed Certifications ─────────────────────────────────────
    await conn.execute(`DELETE FROM certifications`)
    await conn.execute(
      `INSERT INTO certifications (title, issuer, issue_date, expiry_date, credential_id, credential_url) VALUES
      ('AWS Certified Developer – Associate', 'Amazon Web Services', '2024-01-15', '2027-01-15', 'AWS-CDA-2024-XYZ', 'https://aws.amazon.com/certification/'),
      ('Meta Front-End Developer Professional Certificate', 'Meta / Coursera', '2023-09-01', NULL, 'META-FE-2023', 'https://coursera.org/professional-certificates/meta-front-end-developer'),
      ('Google Cloud Associate Cloud Engineer', 'Google Cloud', '2023-05-10', '2026-05-10', 'GCP-ACE-456', 'https://cloud.google.com/certification'),
      ('MySQL 8.0 Database Administrator', 'Oracle', '2022-11-20', NULL, 'ORA-MYSQL-789', 'https://education.oracle.com/mysql')`
    )

    console.log('🎉 Database seeded successfully!')
  } catch (error) {
    console.error('❌ Seed failed:', error)
    throw error
  } finally {
    conn.release()
    await pool.end()
  }
}

seed()
