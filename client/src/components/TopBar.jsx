import { useState } from "react";
import "../css/TopBar.css";
// import ethers from "ethers";
const TopBar = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Connect wallet function
  const connectWallet = async () => {
    if (!window.ethereum) {
      return alert("Metamask is not installed");
    }
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setIsLoading(true);

      setWalletAddress(accounts[0]);
      console.log("wallet address:", accounts);
      console.log(walletAddress);
      loadingTimer();
    } catch (error) {
      console.error("Did work on finding the wallet", error);
    }
  };
  // Disconnect wallet function
  const disconnectWallet = () => {
    setWalletAddress("");
    console.log("Wallet Disconnected");
  };

  // Loading timer function for the duration of the loading animation
  const loadingTimer = () => {
    return setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  // Loading function
  const loadingFunc = () => {
    return (
      <span className="loading loading-infinity loading-lg text-primary"></span>
    );
  };

  const addressReturn = () => {
    return (
      <div className="button-container">
        <button
          onClick={disconnectWallet}
          className="hover-button btn btn-outline btn-primary bg-gray-100 "
        >
          {walletAddress.slice(0, 6) + "..." + walletAddress.slice(-6, -1)}
        </button>
        <span className="hover-text">
          <h3>Disconnect Wallet</h3>
        </span>
      </div>
    );
  };

  return (
    <div className="top-bar navbar bg-base-100">
      <div className="flex-1"></div>
      <div className="flex-none">
        {walletAddress ? (
          isLoading ? (
            loadingFunc()
          ) : (
            addressReturn()
          )
        ) : (
          <button className="btn btn-primary" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default TopBar;
