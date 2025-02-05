import sql from 'mssql';
import tls from 'node:tls';

const config: sql.config = {
    user: 'medimasteradmin',
    password: 'medimasteradmin',
    server: '62.72.43.153',
    database: 'Website',
    port: 1433,
    options: {
        instancename: 'SQLEXPRESS',
        encrypt: true,
        trustServerCertificate: true,
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1.2',
            maxVersion: 'TLSv1.3'
        }
    },
    authentication: {
        type: 'default'
    }
}

let pool: sql.ConnectionPool;

export const getDbPool = async () => {
    if (!pool) {
      try {
        // Explicitly set TLS options
        (tls as any).DEFAULT_MIN_VERSION = 'TLSv1.2';
        
        pool = await sql.connect(config);
      } catch  {
        throw new Error('Database connection failed');
      }
    }
    return pool;
};