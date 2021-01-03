import React, { useState, useEffect } from "react";
import P2PRatingContract from "./contracts/P2PRating.json";
import getWeb3 from "./getWeb3";
import Page from "./components/page";
import "./App.css";

const  App = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    setup();
  }, []);


  const setup = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = P2PRatingContract.networks[networkId];
      const instance = new web3.eth.Contract(
        P2PRatingContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      setWeb3(web3);
      setContract(instance);
      setAccounts(accounts);

      window.ethereum.on("accountsChanged", async ([selectedAccount]) => {
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);
      });
        
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

    if (!web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Page accounts={accounts} contract={contract}/>
      </div>
    );
}

export default App;
