import { Router } from "express";
import { Property, properties } from "../data/properties";
import { log } from "console";

const router = Router();

// Track next ID for new properties
let nextId = properties.length + 1;

// GET all properties
router.get("/", (req, res) => {
  res.json(properties);
});

// GET single property by ID
router.get("/:id", (req, res) => {
  console.log("hit /:id route");
  const id = Number(req.params.id);
  const property = properties.find(p => p.id === id);
  if (!property) return res.status(404).json({ message: "Property not found" });
  res.json(property);
});

// POST a new property
router.post("/", (req, res) => {
  const { name, address, type, rent, status } = req.body;
  const newProperty: Property = {
    id: nextId++, // increment ID
    name,
    address,
    type,
    rent,
    status,
  };
  properties.push(newProperty);
  res.status(201).json(newProperty);
});

// PUT /api/properties/:id — update property
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = properties.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Property not found" });

  const { name, address, type, rent, status } = req.body;
  properties[index] = { id, name, address, type, rent, status };
  res.json(properties[index]);
});

// DELETE /api/properties/:id — delete property
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = properties.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Property not found" });

  const deleted = properties.splice(index, 1);
  res.json(deleted[0]);
});

export default router;
