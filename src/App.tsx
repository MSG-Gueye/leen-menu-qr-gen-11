
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext, useAuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import { navItems } from "./nav-items";
import PaymentPage from "./pages/PaymentPage";
import PublicPaymentPage from "./pages/PublicPaymentPage";

const queryClient = new QueryClient();

const AppContent = () => {
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>
      <Routes>
        {navItems.map(({ to, page, protected: isProtected }) => (
          <Route 
            key={to} 
            path={to} 
            element={isProtected ? <ProtectedRoute>{page}</ProtectedRoute> : page} 
          />
        ))}
        <Route path="/payment/:businessId" element={<PaymentPage />} />
        <Route path="/paiement/:businessId" element={<PaymentPage />} />
        <Route path="/paiement" element={<PaymentPage />} />
        <Route path="/paiement-public" element={<PublicPaymentPage />} />
      </Routes>
    </AuthContext.Provider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
