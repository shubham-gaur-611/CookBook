// import './App.css'
import { RecipeCreation } from "./pages/RecipeCreation";
import { LoginPage } from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RegisterPage } from "./pages/Register";
import { AllReceipe } from "./pages/AllReceipe";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/custom/PrivateRoute";
import { DetailedReceipe } from "./pages/DetailedReceipe";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/allreceipe" element={<AllReceipe />}></Route>
          <Route path="/" element={<AllReceipe />}></Route>
          <Route path="/detailedreceipe/:id" element={<DetailedReceipe />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/create_receipe" element={<RecipeCreation />}></Route>
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
