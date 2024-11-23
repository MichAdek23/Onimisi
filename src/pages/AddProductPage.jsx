import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useWallet, ConnectButton } from "@suiet/wallet-kit";
import { addProduct } from "../firebaseServices";
import "@suiet/wallet-kit/style.css";


// Styled Components
const AddProductContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const InputGroup = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 8px;
  text-align: left;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #61dafb;
  }

  &::placeholder {
    color: #888;
  }
`;

const Select = styled.select`
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #61dafb;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 1.1rem;
  color: #fff;
  background: #61dafb;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #21a1f1;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const PriceInfo = styled.p`
  font-size: 1rem;
  color: #555;
  margin-top: 10px;
`;

const AddProductPage = () => {
  const { connected} = useWallet();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    priceInNaira: "",
    category: "",
    imageUrl: "",
  });
  const [suiPrice, setSuiPrice] = useState(0);
  const [convertedPriceInSui, setConvertedPriceInSui] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchSuiPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=sui&vs_currencies=ngn"
        );
        const data = await response.json();
        setSuiPrice(data.sui.ngn);
      } catch (error) {
        console.error("Error fetching SUI price:", error);
      }
    };
    fetchSuiPrice();
  }, []);

  useEffect(() => {
    if (productData.priceInNaira) {
      setConvertedPriceInSui(productData.priceInNaira / suiPrice);
    }
  }, [productData.priceInNaira, suiPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productData.name || !productData.description || !productData.priceInNaira || !productData.category || !productData.imageUrl) {
      alert("Please fill out all fields.");
      return;
    }

    setIsUploading(true);
    try {
      const product = { ...productData, priceInSui: convertedPriceInSui };
      await addProduct(product); // Call the service function to add the product
      alert("Product added successfully!");
      setProductData({ name: "", description: "", priceInNaira: "", category: "", imageUrl: "" });
      setConvertedPriceInSui(0);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  if (!connected) {
    return (
      <div>
        <p>Please connect your wallet to add a product.</p>
            <ConnectButton/>
     </div>
    );
  }

  return (
    <AddProductContainer>
      <Title>Add a New Product</Title>
      <Form onSubmit={handleSubmit}>
      <InputGroup>
          <Label htmlFor="name">Product Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={(e) => setProductData({ ...productData, name: e.target.value })}
            placeholder="Enter product name"
          />
        </InputGroup>
  
          <InputGroup>
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              id="description"
              name="description"
              value={productData.description}
              onChange={(e) => setProductData({ ...productData, description: e.target.value })}
              placeholder="Enter product description"
            />
          </InputGroup>
  
          <InputGroup>
            <Label htmlFor="priceInNaira">Price in Naira</Label>
            <Input
              type="number"
              id="priceInNaira"
              name="priceInNaira"
              value={productData.priceInNaira}
              onChange={(e) => setProductData({ ...productData, priceInNaira: e.target.value })}
              placeholder="Enter price in Naira"
            />
          </InputGroup>
  
          <InputGroup>
            <Label htmlFor="category">Category</Label>
            <Select
              id="category"
              name="category"
              value={productData.category}
              onChange={(e) => setProductData({ ...productData, category: e.target.value })}
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home Appliances">Home Appliances</option>
              {/* Add more categories as needed */}
            </Select>
          </InputGroup>
  
          <InputGroup>
            <Label htmlFor="imageUrl">Product Image URL</Label>
            <Input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={(e) => setProductData({ ...productData, imageUrl: e.target.value })}
              placeholder="Enter image URL"
            />
          </InputGroup>
  
          {productData.priceInNaira && (
            <PriceInfo>
              Converted Price in SUI: {convertedPriceInSui.toFixed(2)} SUI
            </PriceInfo>
          )}
  
          <Button type="submit" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Add Product"}
          </Button>
        </Form>
    </AddProductContainer>
  );
};

export default AddProductPage;
