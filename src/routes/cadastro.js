const router = require("express").Router()
const usuarioSchema = require("./schemas/userSchema.js")

router.post('/register', (req, res) => {
    try {
      const validatedData = userSchema.parse(req.body);
      
      res.status(200).send('Usuário registrado com sucesso!');
    } catch (error) {
      res.status(400).json({ error: error.errors });
    }
  });

  module.exports = router