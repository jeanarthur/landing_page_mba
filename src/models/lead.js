const mongoose = require("mongoose")

const LeadSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    celular: { type: Number, required: true },
    graduacao: { type: String, required: true },
    cargo: { type: String, required: true },
    salario: { type: Number, required: true }
})

module.exports = mongoose.model('Lead', LeadSchema)