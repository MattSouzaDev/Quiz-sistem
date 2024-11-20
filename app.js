const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser'); // Middleware for parsing request bodies

require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // For parsing form data


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));


app.get('/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM test ORDER BY value DESC LIMIT 10'); // Adjust query as needed
        res.json(result.rows);
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
});

// Endpoint to insert data into the database
app.post('/', async (req, res) => {
    const { name, value } = req.body; // Extract data from the request body

    try {
        const query = `INSERT INTO test (name, value) VALUES ($1, $2)`;
        const values = [name, value];
        await pool.query(query, values);
        res.status(201).send('Data inserted successfully');
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Error inserting data');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});