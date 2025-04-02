
require('dotenv').config();

const express = require('express');
const path = require('path');


const express = require('express');
const app = express();


const PORT = process.env.PORT || 3000; 

app.use(express.static(path.join(__dirname, 'app', 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'index.html'));
});



app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

