import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Property {
  id: number;
  name: string;
  address: string;
  type: string;
  rent: number;
  status: string;
}

const fetchProperties = async (): Promise<Property[]> => {
  const res = await fetch("http://localhost:5000/api/properties");
  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json();
};

export default function Properties() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: properties, isLoading, isError } = useQuery<Property[]>({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  });

  const handleEdit = (id: number) => {
    navigate(`/edit-property/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5000/api/properties/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete property");
      toast.success("Property deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    } catch (err) {
      console.error(err);
      toast.error("Error deleting property");
    }
  };

  if (isLoading) return <div className="text-center mt-20 text-gray-500">Loading properties...</div>;
  if (isError) return <div className="text-center mt-20 text-red-600">Failed to load properties</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Properties</h2>
      <table className="min-w-full border border-gray-200 bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Rent ($)</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties!.map((prop) => (
            <tr key={prop.id} className="text-center border-b">
              <td className="py-2 px-4">{prop.name}</td>
              <td className="py-2 px-4">{prop.address}</td>
              <td className="py-2 px-4">{prop.type}</td>
              <td className="py-2 px-4">{prop.rent}</td>
              <td
                className={`py-2 px-4 font-semibold ${
                  prop.status === "Occupied" ? "text-green-600" : "text-red-600"
                }`}
              >
                {prop.status}
              </td>
              <td className="py-2 px-4 flex justify-center gap-2">
                <button
                  onClick={() => handleEdit(prop.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(prop.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
