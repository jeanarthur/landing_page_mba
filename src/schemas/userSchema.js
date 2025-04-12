const { z } = require('zod');

const userSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }), 
  email: z.string().email({ message: "E-mail inválido" }), 
  phone: z.string().min(1, { message: "Celular é obrigatório" }).regex(/^\d+$/, { message: "Celular deve ser um número" })
});

module.exports = { userSchema };
