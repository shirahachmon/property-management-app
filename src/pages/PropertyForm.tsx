// frontend/src/components/PropertyForm.tsx
import { useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";

export interface PropertyFormValues {
  name: string;
  address: string;
  type: string;
  rent: number;
  status: string;
}

interface PropertyFormProps {
  initialData?: PropertyFormValues;
  onSubmit: (values: PropertyFormValues) => void;
}

export default function PropertyForm({ initialData, onSubmit }: PropertyFormProps) {
  const [form, setForm] = useState<PropertyFormValues>(
    initialData || { name: "", address: "", type: "", rent: 0, status: "Vacant" }
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "rent" ? Number(value) : value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.address) {
      toast.error("Name and Address are required");
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Address</label>
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Type</label>
        <input
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Rent</label>
        <input
          name="rent"
          type="number"
          value={form.rent}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="Occupied">Occupied</option>
          <option value="Vacant">Vacant</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          Save Property
        </button>
      </div>
    </form>
  );
}
