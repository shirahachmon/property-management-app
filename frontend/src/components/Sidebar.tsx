import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-100 w-48 p-4 h-screen">
      <nav className="flex flex-col gap-2">
        <Link to="/">Dashboard</Link>
        <Link to="/properties">Properties</Link>
        <Link to="/tenants">Tenants</Link>
        <Link to="/leases">Leases</Link>
        <Link to="/add-property">Add Property</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
