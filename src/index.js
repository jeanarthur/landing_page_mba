require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require("./database/mongo")


// const cadastroRoutes = require('./routes/cadastro.js');

const lead = require('./models/lead');
const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3000; 


app.use(express.static(path.join(__dirname, 'app', 'public')));
app.use(express.json());


// app.use(cadastroRoutes);
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

app.post('/register', async (req, res) => {
  const dados = req.body;
  dados.salario = parseFloat(dados.salario.replace("R$ ", ""));
  console.log(dados);
  try {
    // const validatedData = userSchema.parse(req.body);
    console.log('/register acessada')
    const novoLead = new lead(dados)
    const leadSalvo = await novoLead.save()

    var filePath = "src/app/public"; //caminho do arquivo completo
    var fileName = "material.pdf"; // O nome padrão que o browser vai usar pra fazer download

    res.download(filePath, fileName);
    res.status(200).send('Usuário registrado com sucesso!');
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
