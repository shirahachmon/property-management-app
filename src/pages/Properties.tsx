import React from "react";
import { useQuery } from "@tanstack/react-query";

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

const Properties: React.FC = () => {
  const { data: properties, isLoading, error } = useQuery<Property[]>({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  });

    if (isLoading) 
    return <div className="text-center mt-20 text-gray-500 text-lg">Loading properties...</div>;

    if (error) 
    return <div className="text-center mt-20 text-red-600 font-semibold">Failed to load properties</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Properties</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Rent ($)</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {properties!.map((prop) => (
            <tr key={prop.id} className="text-center border-b">
              <td className="py-2 px-4">{prop.name}</td>
              <td className="py-2 px-4">{prop.address}</td>
              <td className="py-2 px-4">{prop.type}</td>
              <td className="py-2 px-4">{prop.rent}</td>
              <td className={`py-2 px-4 font-semibold ${prop.status === "Occupied" ? "text-green-600" : "text-red-600"}`}>
                {prop.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Properties;
