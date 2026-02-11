const config = {
    user: 'sa',  // Replace with your SQL Server username
    password: '1234',  // Replace with your actual password
    server: 'localhost\\SQLEXPRESS',  // CHANGED: Use localhost instead of computer name
    database: 'EjabiSoft',  // Replace with your database name
    options: {
        encrypt: false,  // Set to false for local SQL Server Express
        trustServerCertificate: true,
        enableArithAbort: true,
        instanceName: 'SQLEXPRESS'  // Specify the instance name
    },
    connectionTimeout: 30000,  // 30 seconds
    requestTimeout: 30000
};

module.exports = config;