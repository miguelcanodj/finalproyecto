const express = require("express");
const router = express.Router();
const Materia = require("../models/materia"); // Modelo correcto

// Crear una materia
router.post("/", async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevaMateria = new Materia({ nombre });
    await nuevaMateria.save();
    res.status(201).json(nuevaMateria);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todas las materias
router.get("/", async (req, res) => {
  try {
    const materias = await Materia.find();
    res.json(materias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Editar materia
router.put("/:id", async (req, res) => {
  try {
    const { nombre } = req.body;
    const materia = await Materia.findByIdAndUpdate(
      req.params.id,
      { nombre },
      { new: true }
    );
    res.json(materia);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar materia
router.delete("/:id", async (req, res) => {
  try {
    await Materia.findByIdAndDelete(req.params.id);
    res.json({ message: "Materia eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
