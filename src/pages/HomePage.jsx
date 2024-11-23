import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ImageSlider from '../components/ImageSlider';
import { getProducts } from '../firebaseServices'; 

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ProductsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

const ProductsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const ProductCard = styled.div`
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  width: calc(33.33% - 20px);
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: calc(50% - 10px);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;

  @media (max-width: 768px) {
    height: 150px;
  }

  @media (max-width: 480px) {
    height: 120px;
  }
`;

const ProductInfo = styled.div`
  margin-top: 10px;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  margin: 5px 0;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ProductDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 5px 0 10px;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const ProductPrice = styled.span`
  font-weight: bold;
  color: #e63946;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const NoProductsMessage = styled.p`
  font-size: 1rem;
  color: #888;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productList = await getProducts(); // Fetch products from Firestore
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to load products.");
      }
    };

    loadProducts();
  }, []);

  return (
    <HomePageContainer>
      {/* Image Slider */}
      <ImageSlider />

      {/* Product List */}
      <ProductsContainer>
        <SectionTitle>Featured Products</SectionTitle>
        <ProductsList>
          {products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard key={index}>
                <ProductImage
                  src="https://via.placeholder.com/200x200" // Placeholder image
                  alt={product.name}
                />
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductPrice>{`Price: ₦${product.priceInNaira}`}</ProductPrice>
                </ProductInfo>
              </ProductCard>
            ))
          ) : (
            <NoProductsMessage>No products available at the moment</NoProductsMessage>
          )}
        </ProductsList>
      </ProductsContainer>
    </HomePageContainer>
  );
};

export default HomePage;
