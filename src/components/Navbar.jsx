import React, { useState } from "react";
import styled from "styled-components";
import { ConnectButton as ConnectWallet } from "@suiet/wallet-kit";

const Nav = styled.nav`
  background: linear-gradient(90deg, #61dafb, #21a1f1);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Brand = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  span {
    background: white;
    height: 3px;
    width: 25px;
    margin: 3px 0;
    transition: transform 0.3s, opacity 0.3s;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: ${(props) => (props.open ? "flex" : "none")};
    flex-direction: column;
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 60px;
    right: 0;
    width: 100%;
    padding: 20px;
    z-index: 1000;
  }
`;

const NavItem = styled.li`
  margin: 0 15px;

  a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    transition: color 0.3s;

    &:hover {
      color: #d3d3d3;
    }
  }

  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

const ConnectContainer = styled.div`
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State for hamburger menu

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <Nav>
      <Brand>SUI-ICHIBA</Brand>
      <Hamburger onClick={toggleMenu}>
        <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
        <span style={{ opacity: menuOpen ? "0" : "1" }} />
        <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
      </Hamburger>
      <NavList open={menuOpen}>
        <NavItem>
          <a href="/search">Search</a>
        </NavItem>
        <NavItem>
          <a href="/dashboard">Dashboard</a>
        </NavItem>
        <ConnectContainer>
          <ConnectWallet />
        </ConnectContainer>
      </NavList>
    </Nav>
  );
};

export default Navbar;
