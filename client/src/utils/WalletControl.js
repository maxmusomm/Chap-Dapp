class WalletControl {
    constructor() {
        this.walletAddress = "";
    }

    // Connect wallet function
    connectWallet = async () => {
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
    }

    // Disconnect wallet function
    disconnectWallet() {
        setWalletAddress("");
        console.log("Wallet Disconnected");
    }

    // Loading timer function for the duration of the loading animation
    loadingTimer = () => {
        return setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    // Loading function
    loadingFunc = () => {
        return (
            <span className="loading loading-infinity loading-lg text-primary"></span>
        );
    };

    addressReturn = () => {
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
    }
}

export default WalletControl;