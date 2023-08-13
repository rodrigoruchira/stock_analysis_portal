const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mysql = require('mysql');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'finace',
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});



app.get('/api/companies', (req, res) => { 
  const query = 'SELECT c.CompanyID,c.Symbol,c.Name,c.SectorID,c.Description,c.Website,c.ListedDate,s.SectorID,s.Name AS SectorName,s.Description AS SectorDescription  FROM company c  JOIN sector s ON c.SectorID = s.SectorID';
  //console.log('Executing query:', query);
  
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error querying the database:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    console.log(results);
    const companies = results; // Store retrieved data in 'companies' array
    res.json(companies); // Send the data as JSON
  });
});


// Define the /api/sectors endpoint to fetch sector data
app.get('/api/sectors', (req, res) => {
  // Query the database to get sector data
  connection.query('SELECT * FROM sector', (error, results) => {
    if (error) {
      console.error('Error querying sectors:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results); // Send sector data as JSON
  });
});

app.post('/api/savecompany', (req, res) => {
 
  const { Name, Symbol, SectorID } = req.body; 
  // Insert the company data into the database
  connection.query(
    'INSERT INTO company (Name, Symbol, SectorID) VALUES (?, ?, ?)',
    [Name, Symbol, SectorID],
    (error, result) => {
      if (error) {
        console.error('Error inserting company:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json({ message: 'Company saved successfully' });
    }
  );
});



// connection.end((err) => {
//   if (err) {
//     console.error('Error closing the connection:', err);
//     return;
//   }
//   console.log('Connection closed');
// });