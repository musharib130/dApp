import { Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography, type SelectChangeEvent } from '@mui/material'
import { useWalletStore } from '../../wallet/store/walletStore'

export default function Header() {

  const connectionChecked = useWalletStore(state => state.state.connectionChecked)
  const connectedWallets = useWalletStore(state => state.state.connectedWallets)
  const selectedWallet = useWalletStore(state => state.state.selectedWallet)
  const setItem = useWalletStore(state => state.setStateItem)

  const showWalletModal = () => {
    setItem('showWalletModal', true)
  }

  const handleChange = (event: SelectChangeEvent<string>) => {
    setItem('selectedWallet', connectedWallets.find(wallet => wallet.address === event.target.value) || null)
  };

  return (
    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1, borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h6">Welcome</Typography>
        {
          !connectionChecked ? (
            <Button onClick={showWalletModal}>Connect Wallets</Button>
          ) : (
            <FormControl sx={{ minWidth: 440 }}>
              <InputLabel id="demo-simple-select-label">Select Wallet</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedWallet?.address || undefined}
                label="Age"
                onChange={handleChange}>
                {
                  connectedWallets.map((wallet) => (
                    <MenuItem key={wallet.address} value={wallet.address}>{wallet.address}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          )
        }
      </Stack>
  )
}
