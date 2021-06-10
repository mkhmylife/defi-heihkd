import { getProvider } from '~/utils/ether'

export const state = () => ({
  chainId: null,
  connected: false,
})

export const getters = {}

export const mutations = {
  setChainId(state, chainId) {
    state.chainId = chainId
  },
  setConnected(state, isConnected) {
    state.connected = isConnected
  },
}

export const actions = {
  async connectWallet({ commit, dispatch }) {
    const provider = await getProvider()
    if (!provider) {
      console.error('MetaMask is not installed')
      commit('setConnected', false)
      return
    }

    ethereum.on('chainChanged', (chainId) => commit('setNetworkId', chainId))
    const chainId = await ethereum.request({ method: 'eth_chainId' })
    commit('setChainId', chainId)

    await dispatch('daiToken/getContract')
    await dispatch('heihkdToken/getContract')
    await dispatch('wallet/getAccount')
    commit('setConnected', true)
  },
}
