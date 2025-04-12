const router = require("express").Router();
const path = require('path');
const usuarioSchema = require("../schemas/userSchema.js");
const lead = require('../models/lead');

router.post('/register', async (req, res) => {
  const dados = req.body;
  dados.salario = parseFloat(dados.salario.replace("R$ ", "").replace(".", "").replace(",", "."));
  console.log(dados);
  try {
    console.log('/register acessada')
    const novoLead = new lead(dados)
    const leadSalvo = await novoLead.save()

    // Envia o arquivo PDF como resposta
    res.download(path.join(__dirname, '../app/public/material.pdf'), 'material.pdf', (err) => {
      if (err) {
        console.error('Erro ao enviar o arquivo:', err);
        res.status(500).json({ error: 'Erro ao enviar o arquivo' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.errors });
  }
});

module.exports = router;