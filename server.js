const express = require('express');
const fs = require('fs');
const cors = require('cors'); // Make sure to install and use CORS if your Angular app is served from a different port or domain
const bodyParser = require('body-parser');
const app = express();
// Enable CORS
app.use(bodyParser.json());

const filePath = './DataBase/seminarsData.json';
//reading
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the seminars file:', err);
        return;
    }

    let seminars = JSON.parse(data);
    seminars.forEach((seminar, index) => {
        // Add a unique ID based on the index or any other logic
        seminar.id = index + 1;
    });

    fs.writeFile(filePath, JSON.stringify(seminars, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Error writing to the seminars file:', err);
        } else {
            console.log('All seminars updated with unique IDs');
        }
    });
});


const corsOptions = {
    origin: 'http://localhost:4200', // or whichever origin your Angular app is served from
    optionsSuccessStatus: 200 // For legacy browser support
};
app.use(cors(corsOptions));

app.get('/api/seminars', (req, res) => {
    fs.readFile('./DataBase/seminarsData.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading seminar data');
            return;
        }
        res.json(JSON.parse(data));
    });
});
app.use(express.json());

//adding
app.post('/api/seminars', (req, res) => {
    const newSeminar = req.body;
    fs.readFile('./DataBase/seminarsData.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the seminars file:', err);
            return res.status(500).send('Error reading seminars data');
        }

        const seminars = JSON.parse(data || '[]');
        const newId = seminars.length > 0 ? Math.max(...seminars.map(s => s.id)) + 1 : 1;
        newSeminar.id = newId;
        seminars.unshift(newSeminar);

        fs.writeFile('./DataBase/seminarsData.json', JSON.stringify(seminars, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to the seminars file:', err);
                return res.status(500).send('Error saving seminars data');
            }
            res.status(201).json({ message: 'Seminar added successfully', id: newId });
        });
    });
});

//delete

app.delete('/api/seminars/:id', (req, res) => {
    const id = parseInt(req.params.id);
    fs.readFile('./DataBase/seminarsData.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading the seminars file:', err);
        return res.status(500).json({ error: 'Error reading seminars data' });
      }
  
      let seminars = JSON.parse(data);
      const index = seminars.findIndex(seminar => seminar.id === id);
      if (index === -1) {
        return res.status(404).json({ error: 'Seminar not found' });
      }
  
      seminars.splice(index, 1);
      fs.writeFile('./DataBase/seminarsData.json', JSON.stringify(seminars, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error writing to the seminars file:', err);
          return res.status(500).json({ error: 'Error saving seminars data' });
        }
        res.json({ message: 'Seminar deleted successfully' });
      });
    });
  });

 //update

 app.put('/api/seminars/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedSeminar = req.body;

    fs.readFile('./DataBase/seminarsData.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the seminars file:', err);
            return res.status(500).json({ error: 'Error reading seminars data' });
        }

        let seminars = JSON.parse(data);
        const index = seminars.findIndex(seminar => seminar.id === id);
        if (index === -1) {
            return res.status(404).json({ error: 'Seminar not found' });
        }

        // Update the seminar at the found index
        seminars[index] = {...seminars[index], ...updatedSeminar};

        fs.writeFile('./DataBase/seminarsData.json', JSON.stringify(seminars, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to the seminars file:', err);
                return res.status(500).json({ error: 'Error saving seminars data' });
            }
            res.json({ message: 'Seminar updated successfully', updatedSeminar: seminars[index] });
        });
    });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    // Here you would typically check the credentials against a database
    if (username === "admin" && password === "admin123") {
      res.status(200).send({ token: "fake-jwt-token" });
    } else {
      res.status(401).send({ message: "Username or password incorrect" });
    }
  });

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
