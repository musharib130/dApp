import { Button, Input, Stack, Typography } from "@mui/material";
import { useWalletStore } from "../../wallet/store/walletStore";
import { useMessageContract } from "../../../hooks/useWeb3";
import { useState } from "react";

export default function Home() {
  const { contract, currentAccount } = useMessageContract()

  const selectedWallet = useWalletStore(state => state.state.selectedWallet)

  const getMessage = async () => {
    if (!contract) {
      console.log('No provider found')
      return
    }

    try {
      const result = await contract.getMessage();
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  const checkOwner = async () => {
    if (!contract) {
      console.log('No provider or selected wallet found')
      return
    }

    try {
      const result = await contract.getOwner()
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  const changeOwner = async () => {
    if (!contract) {
      console.log('No provider found')
      return
    }

    // try {
    //   const result = await contract.transferOwnership(selectedWallet.address)
    //   console.log(result)
    // } catch (error) {
    //   console.log(error)
    // }
  }

  const updateMessage = async () => {
    if (!contract) {
      console.log('No provider found')
      return
    }

    try {
      const result = await contract.setMessage(message)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  const [message, setMessage] = useState('')
  
  const onMessageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  return (
    <Stack direction="column" gap={2} sx={{
      justifyContent: 'flex-start',
      alignItems: 'center',
      px: 2,
      py: 1,
      borderBottom: '1px solid #e0e0e0',
      flex: '1 1 auto',
    }}>
      <Typography variant="h6">
        Home
      </Typography>
      <Stack direction="row" gap={2} sx={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
        <Typography variant="body1">
          Account: {currentAccount}
        </Typography>
        {/* <Typography variant="body1">
          {selectedWallet?.balance ?? '-'}
        </Typography> */}
      </Stack>
      <Stack direction="row" gap={0.5}>
        <Button onClick={checkOwner} variant="contained" color="primary">
          Check Owner
        </Button>
        <Button onClick={getMessage} variant="contained" color="primary">
          See Message
        </Button>
      </Stack>
      <Stack direction="row" gap={0.5}>
        <Input type="text" placeholder="New Message" value={message} onChange={onMessageInputChange} />
        <Button disabled={!message || message.length === 0} onClick={updateMessage} variant="contained" color="primary">
          Update Message
        </Button>
      </Stack>
    </Stack>
  )
}
