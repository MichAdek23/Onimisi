import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { WalletProvider} from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Dashboard from "./components/Dashboard";
import ProductSearch from "./pages/ProductSearch";
import AddProductPage from "./pages/AddProductPage";
import ManageProductsPage from "./pages/ManageProductsPage";
import ProductPage from "./pages/ProductPage";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <WalletProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/dashboard"element={<Dashboard />}/>
            <Route path="/add-product"element={<AddProductPage />}/>
            <Route path="/manage-product" element={<ManageProductsPage />}/>
            <Route path="/search" element={<ProductSearch />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </WalletProvider>
  );
}

export default App;
