import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: '+00:00',
})

export default pool

export async function query<T = unknown>(
  sql: string,
  values?: unknown[]
): Promise<T[]> {
  const [rows] = await pool.execute(sql, values)
  return rows as T[]
}

// ── Auto-create tables on startup ─────────────────────
let tablesInitialised = false

export async function initTables() {
  if (tablesInitialised) return
  const conn = await pool.getConnection()
  try {
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS skills (
        id           INT AUTO_INCREMENT PRIMARY KEY,
        name         VARCHAR(100)  NOT NULL,
        category     VARCHAR(100)  NOT NULL,
        proficiency  INT           NOT NULL DEFAULT 80,
        icon         VARCHAR(100),
        created_at   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
      )
    `)
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS education (
        id           INT AUTO_INCREMENT PRIMARY KEY,
        institution  VARCHAR(200)  NOT NULL,
        degree       VARCHAR(200)  NOT NULL,
        field        VARCHAR(200)  NOT NULL,
        start_year   INT           NOT NULL,
        end_year     INT,
        grade        VARCHAR(50),
        description  TEXT,
        logo_url     VARCHAR(500),
        created_at   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
      )
    `)
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS experience (
        id               INT AUTO_INCREMENT PRIMARY KEY,
        company          VARCHAR(200)  NOT NULL,
        role             VARCHAR(200)  NOT NULL,
        employment_type  VARCHAR(100)  NOT NULL DEFAULT 'Full-time',
        start_date       DATE          NOT NULL,
        end_date         DATE,
        description      TEXT          NOT NULL,
        tech_stack       JSON,
        logo_url         VARCHAR(500),
        created_at       TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
      )
    `)
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS certifications (
        id              INT AUTO_INCREMENT PRIMARY KEY,
        title           VARCHAR(300)  NOT NULL,
        issuer          VARCHAR(200)  NOT NULL,
        issue_date      DATE          NOT NULL,
        expiry_date     DATE,
        credential_id   VARCHAR(200),
        credential_url  VARCHAR(500),
        badge_url       VARCHAR(500),
        created_at      TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
      )
    `)
    tablesInitialised = true
    console.log('✅ Database tables ready.')
  } catch (err) {
    console.error('❌ Failed to initialise tables:', err)
    throw err
  } finally {
    conn.release()
  }
}
