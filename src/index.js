require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require("./database/mongo")


const cadastroRoutes = require('./routes/cadastro.js');

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

app.post("/teste", async (req, res) => {
  const dados = req.body
  console.log(dados)
  try{
      const novoLead = new lead(dados)
      const leadSalvo = await novoLead.save()

      res.status(201).send(leadSalvo)
  }catch(err){
      res.status(500).send({ mensagem: "Erro ao criar lead"})
  }
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
