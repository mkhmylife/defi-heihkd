import HeiHKDToken from '../../build/contracts/HeihkdToken.json'
import { ethers } from 'ethers'
import { formatEther, getProvider } from '~/utils/ether'

export const state = () => ({
  contract: null,
  owner: null,
  daiBalance: 0,
  heihkdBalance: 0,
  buyRate: 0,
  sellRate: 0,
})

export const getters = {
  daiBalanceFormatted: (state) => parseFloat(formatEther(state.daiBalance)).toFixed(2),
  heihkdBalanceFormatted: (state) => parseFloat(formatEther(state.heihkdBalance)).toFixed(2),
}

export const mutations = {
  setContract(state, contract) {
    state.contract = contract
  },
  setOwner(state, owner) {
    state.owner = owner
  },
  setDaiBalance(state, balance) {
    state.daiBalance = balance
  },
  setHeihkdBalance(state, balance) {
    state.heihkdBalance = balance
  },
  setBuyRate(state, rate) {
    state.buyRate = rate / 100
  },
  setSellRate(state, rate) {
    state.sellRate = rate / 100
  },
}

export const actions = {
  async getContract({ commit, dispatch }) {
    const provider = await getProvider()
    const contract = new ethers.Contract(
      this.$config.heihkdContractAddress,
      HeiHKDToken.abi,
      provider
    )
    commit('setContract', contract)
    window.contract = contract

    const owner = await contract.owner()
    commit('setOwner', owner)

    await dispatch('getExchangeRate')
    await dispatch('getBalance')

    provider.on({ address: this.$config.heihkdContractAddress }, async () => {
      await dispatch('heihkdToken/getBalance', null, { root: true })
      await dispatch('wallet/getBalances', null, { root: true })
      await dispatch('wallet/getAllowance', null, { root: true })
    })

    // ToDo enhance this part
    setInterval(async () => {
      await dispatch('heihkdToken/getBalance', null, { root: true })
    }, 1000 * 5)
  },
  async getBalance({ commit, state }) {
    const daiBalance = await state.contract.daiBalance()
    console.log(daiBalance.toString())
    commit('setDaiBalance', daiBalance)
    const heihkdBalance = await state.contract.balanceOf(
      this.$config.heihkdContractAddress
    )
    commit('setHeihkdBalance', heihkdBalance)
  },
  async getExchangeRate({ commit, state }) {
    const fromDaiToHeihkd = await state.contract.getBuyRate()
    const fromHeihkdToDai = await state.contract.getSellRate()
    commit('setBuyRate', fromDaiToHeihkd)
    commit('setSellRate', fromHeihkdToDai)
  },
}
