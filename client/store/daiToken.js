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
      this.$config.daiContractAddress,
      DAIToken.abi,
      provider
    )
    commit('setContract', contract)

    provider.on({ address: this.$config.daiContractAddress }, async (e) => {
      await dispatch('wallet/getBalances', null, { root: true })
      await dispatch('wallet/getAllowance', null, { root: true })
    })

    // ToDo enhance this part
    setInterval(async () => {
      await dispatch('wallet/getAllowance', null, { root: true })
      await dispatch('wallet/getBalances', null, { root: true })
    }, 1000 * 5)
  },
}
