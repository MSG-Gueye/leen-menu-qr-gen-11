
import { HomeIcon, Building2 } from "lucide-react";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Admin Dashboard",
    to: "/admin",
    icon: <Building2 className="h-4 w-4" />,
    page: <AdminDashboard />,
  },
];
