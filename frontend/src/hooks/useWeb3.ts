import { ethers } from "ethers";
import { useEffect, useState } from "react";


export const useMessageContract = () => {
    const contractAddress = "0xD2f4C11b284cc45CAbB3542Cf5349091DA995806";

    const abi = [
        "function getMessage() public view returns (string memory)",
        "function setMessage(string memory _newMessage) public",
        "function transferOwnership(address _newOwner) public",
        "function getOwner() public view returns (address)",
    ];

    const [contract, setContract] = useState<any>(null)
    const [currentAccount, setCurrentAccount] = useState<any>(null)

    useEffect(() => {
        (async () => {
            if (!window.ethereum) {
                console.log('No provider found')
                return
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner()

            setContract(new ethers.Contract(contractAddress, abi, signer));

            window.ethereum.on('accountsChanged', (accounts: any) => {
                setCurrentAccount(accounts[0])
                console.log('current account', accounts[0])
            })
        })()

        return () => {
            window.ethereum.removeListener('accountsChanged', (accounts: any) => {
                setCurrentAccount(accounts[0])
                console.log('current account', accounts[0])
            })
        }
    }, [currentAccount])
    
    return { contract, currentAccount }
}