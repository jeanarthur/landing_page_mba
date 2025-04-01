const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'app', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

app.listen(3000, () => {
  console.log(`Servidor rodando em http://localhost:3000`);
});
