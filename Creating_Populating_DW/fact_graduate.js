var mysql = require('mysql2');
const csvtojson = require('csvtojson');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "******",
  database: "Graduates",
  multipleStatements: true
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

    const filename = "Fact_graduate.csv";
    csvtojson().fromFile(filename).then(source => {
        for (let i = 0; i < source.length; i++) {
            const std_id = source[i]['std_id'],
                  sem_id = source[i]['sem_id'],
                  status_id = source[i]['status_id'],
                  degree_id = source[i]['degree_id'],
                  grad_students_count = 1; // Set to 1 for each graduate

            const insertStatement = `INSERT INTO Fact_graduates (std_id, sem_id, status_id, degree_id, grad_students_count) VALUES (?, ?, ?, ?, ?)`;
            const items = [std_id, sem_id, status_id, degree_id, grad_students_count];

            // Perform the query
            con.query(insertStatement, items, (err, results, fields) => {
                if (err) { 
                    console.log("Unable to insert item at row ", i + 1); 
                    return console.log(err); 
                } 
            }); 
        } 
        console.log("All items stored into database successfully"); 
    }).catch(err => {
        console.error("Error reading CSV file:", err);
    });