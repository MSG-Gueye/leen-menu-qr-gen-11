
import { HomeIcon, Building2, Star, DollarSign, Phone, FileText } from "lucide-react";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import SubscriptionRequest from "./pages/SubscriptionRequest";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Features",
    to: "/features",
    icon: <Star className="h-4 w-4" />,
    page: <Features />,
  },
  {
    title: "Pricing", 
    to: "/pricing",
    icon: <DollarSign className="h-4 w-4" />,
    page: <Pricing />,
  },
  {
    title: "Contact",
    to: "/contact", 
    icon: <Phone className="h-4 w-4" />,
    page: <Contact />,
  },
  {
    title: "Subscription Request",
    to: "/subscription-request",
    icon: <FileText className="h-4 w-4" />,
    page: <SubscriptionRequest />,
  },
  {
    title: "Admin Dashboard",
    to: "/admin",
    icon: <Building2 className="h-4 w-4" />,
    page: <AdminDashboard />,
  },
];
