// routes/notas.js
const express = require("express");
const router = express.Router();
const Nota = require("../models/nota");

// Crear una nota
router.post("/", async (req, res) => {
  try {
    const { materiaId, descripcion, calificacion } = req.body;

    // Validar que vengan todos los campos
    if (!materiaId || !descripcion || calificacion === undefined) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const nota = new Nota({ materiaId, descripcion, calificacion });
    const nuevaNota = await nota.save();
    res.status(201).json(nuevaNota);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todas las notas
router.get("/", async (req, res) => {
  try {
    const notas = await Nota.find().populate("materiaId", "nombre");
    res.json(notas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener notas por materia
router.get("/materia/:materiaId", async (req, res) => {
  try {
    const notas = await Nota.find({ materiaId: req.params.materiaId });
    res.json(notas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Editar nota
router.put("/:id", async (req, res) => {
  try {
    const { descripcion, calificacion } = req.body;
    const nota = await Nota.findByIdAndUpdate(
      req.params.id,
      { descripcion, calificacion },
      { new: true }
    );
    res.json(nota);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar nota
router.delete("/:id", async (req, res) => {
  try {
    await Nota.findByIdAndDelete(req.params.id);
    res.json({ message: "Nota eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
