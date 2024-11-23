export const connectWallet = async () => {
    try {
      // Check for the Sui Wallet extension
      if (!window.sui) {
        throw new Error('Sui Wallet is not installed.');
      }
  
      // Attempt to connect to the wallet
      const wallet = await window.sui.connect();
      const accounts = await wallet.getAccounts();
      if (accounts.length === 0) throw new Error('No accounts found.');
      const account = accounts[0];
  
      // Store the account info in localStorage
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('currentAccount', account.address);
      return account;
    } catch (error) {
      // Log the error for debugging
      console.error('Wallet connection failed:', error);
  
      // Provide feedback to the user
      alert(error.message || 'Error connecting to wallet.');
      return null;
    }
  };
  
  export const getSuiBalance = async (account) => {
    try {
      const balance = await window.sui.getBalance(account);
      return balance.total; // Replace with actual balance key from response
    } catch (error) {
      console.error("Failed to fetch SUI balance:", error);
      return 0;
    }
  };
  
  export const getCurrentAccount = () => {
    return localStorage.getItem("currentAccount");
  };
  
  