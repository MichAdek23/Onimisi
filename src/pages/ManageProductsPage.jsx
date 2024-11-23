import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getProducts, deleteProduct, updateProduct } from "../firebaseServices";
// Styled Components

const ManageProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  justify-items: center;
`;

const ProductCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-bottom: 2px solid #f1f1f1;
`;

const ProductInfo = styled.div`
  padding: 20px;
  text-align: left;
`;

const ProductName = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 15px;
`;

const ProductPrice = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: #2ecc71;
  margin-bottom: 15px;
`;

const CategoryLabel = styled.span`
  font-size: 0.9rem;
  color: #555;
  background: #f1f1f1;
  padding: 5px 10px;
  border-radius: 12px;
  margin-bottom: 20px;
  display: inline-block;
`;

const Button = styled.button`
  background: #e74c3c;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #c0392b;
  }

  &:not(:first-child) {
    margin-left: 10px;
  }
`;

const ManageProductsPage = () => {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchAllProducts = async () => {
        try {
          const productsList = await getProducts(); // Fetch products from Firestore
          setProducts(productsList);
        } catch (error) {
          console.error("Error fetching products:", error);
          alert("Failed to load products.");
        }
      };
  
      fetchAllProducts();
    }, []);
  
    const handleDelete = async (productId) => {
      try {
        await deleteProduct(productId); // Delete the product from Firestore
        setProducts(products.filter((product) => product.id !== productId)); // Update state
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
      }
    };
  
    const handleEdit = async (productId, updatedProductData) => {
      try {
        await updateProduct(productId, updatedProductData); // Update the product in Firestore
        alert("Product updated successfully!");
      } catch (error) {
        console.error("Error updating product:", error);
        alert("Failed to update product.");
      }
    };
  
    return (
      <ManageProductContainer>
        <Title>Manage Your Products</Title>
        {products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <ProductList>
            {products.map((product) => (
              <ProductCard key={product.id}>
                <ProductImage src={product.imageUrl} alt={product.name} />
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductPrice>
                    Price: {product.priceInNaira} Naira ({product.priceInSui} SUI)
                  </ProductPrice>
                  <CategoryLabel>{product.category}</CategoryLabel>
                  <div>
                    <Button onClick={() => handleDelete(product.id)}>Delete</Button>
                    <Button onClick={() => handleEdit(product.id, { priceInNaira: 5000 })}>Edit</Button>
                  </div>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductList>
        )}
      </ManageProductContainer>
    );
  };
  
export default ManageProductsPage;
