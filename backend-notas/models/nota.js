const mongoose = require("mongoose");

const notaSchema = new mongoose.Schema({
  materiaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Materia",
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  calificacion: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  }
});

module.exports = mongoose.model("Nota", notaSchema);
