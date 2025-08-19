import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddProperty: React.FC = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [rent, setRent] = useState<number>(0);
  const [status, setStatus] = useState("Vacant");

  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const newProperty = { name, address, type, rent, status };

  try {
    const res = await fetch("http://localhost:5000/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProperty),
    });

    if (!res.ok) throw new Error("Failed to add property");

    // Reset form
    setName("");
    setAddress("");
    setType("");
    setRent(0);
    setStatus("Vacant");

    toast.success("Property added successfully!");
    navigate("/properties");
  } catch (err) {
    console.error(err);
    toast.error("Error adding property");
  }
};


  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Property</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
        <input
          type="text"
          placeholder="Property Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Type (e.g., House, Apartment)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Rent ($)"
          value={rent}
          onChange={(e) => setRent(Number(e.target.value))}
          className="border p-2 rounded"
          required
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="Vacant">Vacant</option>
          <option value="Occupied">Occupied</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded mt-2">
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
