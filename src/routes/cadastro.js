const router = require("express").Router()
const usuarioSchema = require("../schemas/userSchema.js");
const lead = require('../models/lead');

router.post('/register', async (req, res) => {
  const dados = req.body;
  dados.salario = parseFloat(dados.salario.replace("R$ ", ""));
  console.log(dados);
  try {
    // const validatedData = userSchema.parse(req.body);
    console.log('/register acessada')
    const novoLead = new lead(dados)
    const leadSalvo = await novoLead.save()

    // var filePath = "src/app/public"; //caminho do arquivo completo
    // var fileName = "material.pdf"; // O nome padrão que o browser vai usar pra fazer download

    res.download('material.pdf');
    res.status(200).send({message: 'Usuário registrado com sucesso!'});
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.errors });
  }
});

module.exports = router