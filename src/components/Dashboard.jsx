import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useWallet } from "@suiet/wallet-kit";

// Styled Components
const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const AccountDetails = styled.div`
  margin-bottom: 30px;

  p {
    font-size: 1.2rem;
    color: #555;
    margin: 10px 0;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const DashboardSections = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.section`
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 15px;

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }

  button {
    background: #61dafb;
    color: #fff;
    border: none;
    padding: 10px 15px;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #21a1f1;
    }

    @media (max-width: 768px) {
      padding: 8px 12px;
      font-size: 0.9rem;
    }
  }
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #888;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const MessageButton = styled.button`
  background: #61dafb;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: #21a1f1;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }

  @media (max-width: 768px) {
    padding: 8px 15px;
    font-size: 0.9rem;
  }
`;

const Dashboard = () => {
  const { connected, account, getBalance, connect } = useWallet();
  const [suiBalance, setSuiBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      if (connected && account?.address) {
        const balance = await getBalance(account.address);
        setSuiBalance(balance.total);
      }
    };
    fetchBalance();
  }, [connected, account, getBalance]); 

  return (
    <DashboardContainer>
      <Title>Welcome to Your Dashboard</Title>
      {connected ? (
        <div>
          <AccountDetails>
            <p>Connected Wallet: {account.address}</p>
            <p>SUI Balance: {suiBalance} SUI</p>
          </AccountDetails>
          <DashboardSections>
            {connected && (
              <Section>
                <h2>Add Product</h2>
                <button>Add New Product</button>
              </Section>
            )}
            <Section>
              <h2>Manage Products</h2>
              <button>View My Products</button>
            </Section>
            <Section>
              <h2>Marketplace Balance</h2>
              <button>Deposit Funds</button>
            </Section>
            <Section>
              <h2>Transaction History</h2>
              <button>View Transactions</button>
            </Section>
          </DashboardSections>
        </div>
      ) : (
        <div>
          <Message>Please connect your wallet to access the dashboard.</Message>
          <MessageButton onClick={connect}>Connect Wallet</MessageButton>
        </div>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
