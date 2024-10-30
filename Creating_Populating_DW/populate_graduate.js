var mysql = require('mysql2');
const csvtojson = require('csvtojson');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "*****",
  database: "Graduates",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const filename1 = "UCollegeDF.csv";
csvtojson().fromFile(filename1).then(source => {
    for (let i = 0; i < source.length; i++) {
        const c_id = source[i]['C_id'],
              c_name = source[i]['Name of Colleges'],
              c_oldname = source[i]['Name of Old_Colleges'];

        const insertStatement = `INSERT INTO College VALUES (?, ?, ?)`;
        const items = [c_id, c_name, c_oldname];
        
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

const filename2 = "UMajorDF.csv";
csvtojson().fromFile(filename2).then(source => {
    for (let i = 0; i < source.length; i++) {
        const major_id = source[i]['Major_id'],
              major_name = source[i]['Major'],
              college_id = source[i]['College_id'];

        const insertStatement = `INSERT INTO Major VALUES (?, ?, ?)`;
        const items = [major_id, major_name, college_id];
        
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

const filename3 = "UDegreeDF.csv";
csvtojson().fromFile(filename3).then(source => {
    for (let i = 0; i < source.length; i++) {
        const deg_id = source[i]['Degree_id'],
              deg_name = source[i]['Degree'],
              major_id = source[i]['Major_id'];

        const insertStatement = `INSERT INTO Degree VALUES (?, ?, ?)`;
        const items = [deg_id, deg_name, major_id];
        
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

const filename4 = "UGPA_statusDF.csv";
csvtojson().fromFile(filename4).then(source => {
    for (let i = 0; i < source.length; i++) {
        const gstatus_id = source[i]['GPAstatus_ID'],
              gpa = source[i]['GPA'],
              gpa_standing = source[i]['GPA_Standing'];

        const insertStatement = `INSERT INTO GPA_status VALUES (?, ?, ?)`;
        const items = [gstatus_id, gpa_standing, gpa];
        
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

const filename5 = "UStudentDF.csv";
csvtojson().fromFile(filename5).then(source => {
    for (let i = 0; i < source.length; i++) {
        const std_id = source[i]['ID'],
              std_name = source[i]['Name'],
              std_address = source[i]['Address']
              gstatus_id = source[i]['GPAstatus_ID'];

        const insertStatement = `INSERT INTO Student VALUES (?, ?, ?, ?)`;
        const items = [std_id, std_name, std_address, gstatus_id];
        
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

const filename6 = "UStatusDF.csv";
csvtojson().fromFile(filename6).then(source => {
    for (let i = 0; i < source.length; i++) {
        const status_id = source[i]['status_id'],
              status_name = source[i]['Status'],
              status_desc = source[i]['status_desc'];

        const insertStatement = `INSERT INTO Status VALUES (?, ?, ?)`;
        const items = [status_id, status_name, status_desc];
        
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

const filename7 = "UYearDF.csv";
csvtojson().fromFile(filename7).then(source => {
    for (let i = 0; i < source.length; i++) {
        const y_id = source[i]['year_id'],
              year = source[i]['Y'];

        const insertStatement = `INSERT INTO Year VALUES (?, ?)`;
        const items = [y_id, year];
        
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

const filename8 = "USemesterDF.csv";
csvtojson().fromFile(filename8).then(source => {
    for (let i = 0; i < source.length; i++) {
        const sem_id = source[i]['sem_id'],
              sem_name = source[i]['Semester'],
              month_day = source[i]['Month Day']
              year_id = source[i]['year_id'];

        const insertStatement = `INSERT INTO Semester VALUES (?, ?, ?, ?)`;
        const items = [sem_id, sem_name, month_day, year_id];
        
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