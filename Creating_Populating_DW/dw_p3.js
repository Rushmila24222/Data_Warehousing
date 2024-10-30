var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "*****",
  multipleStatements: true 
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

const dbname = "Graduates";
con.query(`SHOW DATABASES LIKE '${dbname}'`, function (err, result) {
    if (err) throw err;

    if (result.length === 0) {
        con.query(`CREATE DATABASE ${dbname}`, function (err, result) {
            if (err) throw err;
            console.log(`Data Warehouse ${dbname} created successfully.`);
            con.changeUser({ database: dbname }, function (err) {
                if (err) throw err;
                console.log(`Connected to ${dbname}`);
                createTables();
            });
        });
    } else {
        console.log(`Data Warehouse ${dbname} already exists.`);
        con.changeUser({ database: dbname }, function (err) {
            if (err) throw err;
            console.log(`Connected to ${dbname}`);
            createTables(); // Call the function to create tables
        });
    }
});

function createTables() {
    const TableQueries = [
        `CREATE TABLE IF NOT EXISTS College (
            c_id VARCHAR(255) PRIMARY KEY,
            c_name VARCHAR(255) NOT NULL,
            c_oldname VARCHAR(255)
        )`,
        
        `CREATE TABLE IF NOT EXISTS Major (
            major_id VARCHAR(255) PRIMARY KEY,
            major_name VARCHAR(255) NOT NULL,
            college_id VARCHAR(255),
            FOREIGN KEY (college_id) REFERENCES College(c_id)
        )`,
        
        `CREATE TABLE IF NOT EXISTS Degree (
            deg_id VARCHAR(255),
            deg_name VARCHAR(255) NOT NULL,
            major_id VARCHAR(255),
            PRIMARY KEY (deg_id, major_id),
            FOREIGN KEY (major_id) REFERENCES Major(major_id)
        )`,
        
        `CREATE TABLE IF NOT EXISTS GPA_status (
            gstatus_id VARCHAR(255),
            gpa_standing VARCHAR(255) NOT NULL,
            gpa VARCHAR(255),
            PRIMARY KEY (gstatus_id, gpa)
        )`,
        
        `CREATE TABLE IF NOT EXISTS Student (
            std_id INT PRIMARY KEY,
            std_name VARCHAR(255) NOT NULL,
            std_address VARCHAR(255),
            gstatus_id VARCHAR(255),
            FOREIGN KEY (gstatus_id) REFERENCES GPA_status(gstatus_id)
        )`,
        
        `CREATE TABLE IF NOT EXISTS Status (
            status_id VARCHAR(255) PRIMARY KEY,
            status_name VARCHAR(255) NOT NULL,
            status_desc VARCHAR(255)
        )`,
        
        `CREATE TABLE IF NOT EXISTS Year (
            y_id VARCHAR(255) PRIMARY KEY,
            year INT
        )`,
        
        `CREATE TABLE IF NOT EXISTS Semester (
            sem_id VARCHAR(255),
            sem_name VARCHAR(255) NOT NULL,
            month_day VARCHAR(255),
            year_id VARCHAR(255),
            PRIMARY KEY(sem_id, year_id),
            FOREIGN KEY (year_id) REFERENCES Year(y_id)
        )`,
        
        `CREATE TABLE IF NOT EXISTS Fact_graduates (
            std_id INT,
            sem_id VARCHAR(255),
            status_id VARCHAR(255),
            degree_id VARCHAR(255),
            grad_students_count INT,
            PRIMARY KEY (std_id),
            FOREIGN KEY (std_id) REFERENCES Student(std_id),
            FOREIGN KEY (sem_id) REFERENCES Semester(sem_id),
            FOREIGN KEY (status_id) REFERENCES Status(status_id),
            FOREIGN KEY (degree_id) REFERENCES Degree(deg_id)
            
        )`
    ];

    TableQueries.forEach((query) => {
        con.query(query, (err, results) => {
            if (err) {
                console.error(`Error creating table: ${err.message}`);
            } else {
                console.log('Table created successfully');
            }
        });
    });
}