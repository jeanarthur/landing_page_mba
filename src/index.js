require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require("./database/mongo")

const cadastroRoutes = require('./routes/cadastro');

const lead = require('./models/lead');
const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3000; 

app.use(express.static(path.join(__dirname, 'app', 'public')));
app.use(express.json());

app.use(cadastroRoutes);
connectDB()

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
