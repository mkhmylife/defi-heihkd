import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'

export const getProvider = async () => {
  const provider = await detectEthereumProvider()
  if (!provider) {
    return false
  }
  if (provider !== window.ethereum) {
    console.error('Do you have multiple wallets installed?')
    return false
  }
  return new ethers.providers.Web3Provider(window.ethereum)
}

export const getSigner = async () => {
  const provider = await getProvider()
  return provider.getSigner()
}

export const formatEther = (wei) => {
  try {
    return ethers.utils.formatEther(wei)
  } catch (e) {
    return wei
  }
}

export const parseEther = (ether) => {
  return ethers.utils.parseEther(ether)
}
