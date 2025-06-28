import { Button, Paper, Stack, Typography } from "@mui/material";
import { ethers } from 'ethers';
import Model from '../shared/Model/Model';
import type { WalletDetail } from '../../global/store/globalStore.interfaces';
import { useWalletStore } from "./store/walletStore";

export default function WalletConnection() {

    const showWalletModal = useWalletStore(state => state.state.showWalletModal)
    const connectedWallets = useWalletStore(state => state.state.connectedWallets)
    const setItem = useWalletStore(state => state.setStateItem)


  const onClose = () => {
    setItem('showWalletModal', false)
  }

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      console.log(accounts)

      const walletDetails: WalletDetail[] = []

      for (const account of accounts) {
        const balance = await getBalance(account);
        walletDetails.push({
          address: account,
          balance: balance
        })
      }

      setItem('connectionChecked', true)
      setItem('connectedWallets', walletDetails)
      onClose()
    } catch (error) {
      console.error(error);
    }
  };

  const getBalance = async (address: string) => {
    if (!window.ethereum) return

    const provider = new ethers.BrowserProvider(window.ethereum);
    return provider.getBalance(address);
  };

  return (
    <Model showModal={showWalletModal}>
      <Paper className="paper" elevation={4} sx={{ px: 2, py: 1 }}>
        <Stack direction="column" sx={{ justifyContent: 'flex-start', alignItems: 'center' }}>
          <Typography variant="h6">Connect Wallet</Typography>
          <Stack direction="row" spacing={2}>
            <Button onClick={connectWallet} variant="contained" color="primary">Connect</Button>
            <Button onClick={onClose} variant="contained" color="secondary">Close</Button>
          </Stack>

          {connectedWallets?.length > 0 && (
            <div>
              {connectedWallets.map((wallet) => (
                <div key={wallet.address}>
                  <p>Address: {wallet.address}</p>
                  <p>Balance: {wallet.balance} ETH</p>
                </div>
              ))}
            </div>
          )}
        </Stack>
      </Paper>
    </Model>
  )
}
