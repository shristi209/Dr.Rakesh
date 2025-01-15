import sql from 'mssql';

const config = {
    user: 'medimasteradmin',
    password: 'medimasteradmin',
    server: '62.72.43.153',
    database: 'Website',
    port: 1433,
    options: {
        instancename: 'SQLEXPRESS',
        encrypt: true,
        trustedconnection: true,
        trustServerCertificate: true
    },
}

let pool: sql.ConnectionPool;


export const getDbPool = async () => {
    if (!pool) {
      try {
        pool = await sql.connect(config);
        console.log('Database connected successfully');
      } catch (error) {
        console.error('Error connecting to the database:', error);
        throw new Error('Database connection failed');
      }
    }
    return pool;
  };