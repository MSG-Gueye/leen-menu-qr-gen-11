
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import PaymentPage from "./pages/PaymentPage";
import PublicPaymentPage from "./pages/PublicPaymentPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {navItems.map(({ to, page }) => (
            <Route key={to} path={to} element={page} />
          ))}
          <Route path="/payment/:businessId" element={<PaymentPage />} />
          <Route path="/paiement/:businessId" element={<PaymentPage />} />
          <Route path="/paiement" element={<PaymentPage />} />
          <Route path="/paiement-public" element={<PublicPaymentPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
