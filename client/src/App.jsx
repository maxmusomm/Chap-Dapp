import "./css/App.css";
import NavBar from "./components/NavBar";
import TopBar from "./components/TopBar";
import ChatBar from "./components/ChatBar";
import { useState } from "react";

function App() {
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
      console.log("wallet address:", accounts[0]);
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
    <>
      <div className="App">
        <div className="grid grid-rows-layout grid-cols-layout h-screen">
          {/* TopBar */}
          <div className="row-span-1 col-span-2 border-b">
            <TopBar
              walletAddress={walletAddress}
              isLoading={isLoading}
              loadingFunc={loadingFunc}
              addressReturn={addressReturn}
              connectWallet={connectWallet}
            />
          </div>

          {/* NavBar */}
          <div className="nav-bar row-span-2 col-span-1 border-r">
            <NavBar />
          </div>

          {/* ChartBar */}
          <div className="chat-bar row-span-2 col-span-1">
            <ChatBar walletAddress={walletAddress} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
