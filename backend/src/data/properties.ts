export interface Property {
  id: number;
  name: string;
  address: string;
  type: string;
  rent: number;
  status: string;
}

export let properties: Property[] = [
  { id: 1, name: "Sunset Villa", address: "123 Palm St", type: "House", rent: 2500, status: "Occupied" },
  { id: 2, name: "Downtown Loft", address: "456 Main Ave", type: "Apartment", rent: 1800, status: "Vacant" },
  { id: 3, name: "Lakeside Cabin", address: "789 Lake Rd", type: "Cabin", rent: 2000, status: "Occupied" },
];
