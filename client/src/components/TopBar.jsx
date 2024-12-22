// import { useState } from "react";
import "../css/TopBar.css";
// import ethers from "ethers";
const TopBar = ({
  walletAddress,
  isLoading,
  loadingFunc,
  addressReturn,
  connectWallet,
}) => {
  return (
    <div className="top-bar navbar bg-base-100">
      <div className="flex-1">
        <h2 className="logo-name">Chap Dapp</h2>
      </div>
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
