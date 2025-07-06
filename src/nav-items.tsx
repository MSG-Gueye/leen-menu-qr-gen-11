
import { HomeIcon, Building2, Star, DollarSign, Phone, FileText, LogIn } from "lucide-react";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import SubscriptionRequest from "./pages/SubscriptionRequest";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import MenuPage from "./pages/MenuPage";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
    protected: false,
  },
  {
    title: "Features",
    to: "/features",
    icon: <Star className="h-4 w-4" />,
    page: <Features />,
    protected: false,
  },
  {
    title: "Pricing", 
    to: "/pricing",
    icon: <DollarSign className="h-4 w-4" />,
    page: <Pricing />,
    protected: false,
  },
  {
    title: "Contact",
    to: "/contact", 
    icon: <Phone className="h-4 w-4" />,
    page: <Contact />,
    protected: false,
  },
  {
    title: "Subscription Request",
    to: "/subscription-request",
    icon: <FileText className="h-4 w-4" />,
    page: <SubscriptionRequest />,
    protected: false,
  },
  {
    title: "Login",
    to: "/login",
    icon: <LogIn className="h-4 w-4" />,
    page: <Login />,
    protected: false,
  },
  {
    title: "Admin Dashboard",
    to: "/admin",
    icon: <Building2 className="h-4 w-4" />,
    page: <AdminDashboard />,
    protected: true,
  },
  {
    title: "Menu",
    to: "/menu/:id",
    icon: <Star className="h-4 w-4" />,
    page: <MenuPage />,
    protected: false,
  },
  {
    title: "Not Found",
    to: "*",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <NotFound />,
    protected: false,
  },
];
