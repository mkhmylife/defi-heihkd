import DAIToken from '../../build/contracts/DaiToken.json'
import { ethers } from 'ethers'
import { getProvider } from '~/utils/ether'

export const state = () => ({
  contract: null,
})

export const mutations = {
  setContract(state, contract) {
    state.contract = contract
  },
}

export const actions = {
  async getContract({ commit, dispatch }) {
    const provider = await getProvider()
    const contract = new ethers.Contract(
      process.env.daiContractAddress,
      DAIToken.abi,
      provider
    )
    commit('setContract', contract)

    provider.on({ address: process.env.daiContractAddress }, async (e) => {
      await dispatch('wallet/getBalances', null, { root: true })
      await dispatch('wallet/getAllowance', null, { root: true })
    })
  },
}
