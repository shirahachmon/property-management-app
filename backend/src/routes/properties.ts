import { Router } from "express";
import { properties, Property } from "../data/properties";

const router = Router();

// GET all properties
router.get("/", (req, res) => {
  res.json(properties);
});

// POST a new property
router.post("/", (req, res) => {
  const { name, address, type, rent, status } = req.body;

  const newProperty: Property = {
    id: properties.length + 1,
    name,
    address,
    type,
    rent,
    status,
  };

  properties.push(newProperty);

  res.status(201).json(newProperty);
});

export default router;
