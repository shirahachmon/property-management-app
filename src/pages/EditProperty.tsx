import React, { type JSX } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { PropertyFormValues } from "./PropertyForm";
import PropertyForm from "./PropertyForm";

const fetchProperty = async (id: string): Promise<PropertyFormValues> => {
  const res = await fetch(`http://localhost:5000/api/properties/${id}`);
  if (!res.ok) throw new Error("Property not found");
  return res.json();
};

const updateProperty = async (payload: PropertyFormValues & { id: string }): Promise<PropertyFormValues> => {
  const res = await fetch(`http://localhost:5000/api/properties/${payload.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update property");
  return res.json();
};

export default function EditProperty(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

const { data, isLoading, isError } = useQuery({
  queryKey: ["property", id],
  queryFn: () => fetchProperty(id!),
  enabled: !!id,
});

  const mutation = useMutation({
    mutationFn: (updated: PropertyFormValues) => updateProperty({ ...updated, id: id! }),
    onSuccess: () => {
      toast.success("Property updated");
      queryClient.invalidateQueries({ queryKey: ["properties"] });

      navigate("/properties");
    },
    onError: () => toast.error("Failed to update property"),
  });

  if (isLoading) return <div className="p-4 text-center">Loading property...</div>;
  if (isError || !data) return <div className="p-4 text-center text-red-600">Failed to load property</div>;

  return <PropertyForm initialData={data} onSubmit={mutation.mutate} />;
}
