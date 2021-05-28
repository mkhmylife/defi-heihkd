import { ethers } from 'ethers'
import HeiHKDToken from '../../build/contracts/HeiHKDToken.json'
import { formatEther, getProvider } from '~/utils/ether'

export const state = () => ({
  contract: null,
  owner: null,
  daiBalance: 0,
  heihkdBalance: 0,
  exchangeRateFromDaiToHeiHkd: 0,
  exchangeRateFromHeihkdToDai: 0,
})

export const getters = {
  daiBalanceFormatted: (state) => formatEther(state.daiBalance),
  heihkdBalanceFormatted: (state) => formatEther(state.heihkdBalance),
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
  setExchangeRateFromDaiToHeiHkd(state, rate) {
    state.exchangeRateFromDaiToHeiHkd = rate / 1000
  },
  setExchangeRateFromHeihkdToDai(state, rate) {
    state.exchangeRateFromHeihkdToDai = rate / 1000
  },
}

export const actions = {
  async getContract({ commit, dispatch }) {
    const provider = await getProvider()
    const contract = new ethers.Contract(
      process.env.heihkdContractAddress,
      HeiHKDToken.abi,
      provider
    )
    commit('setContract', contract)

    const owner = await contract.getOwner()
    commit('setOwner', owner)

    await dispatch('getExchangeRate')
    await dispatch('getBalance')

    provider.on({ address: process.env.heihkdContractAddress }, async () => {
      await dispatch('heihkdToken/getBalance', null, { root: true })
      await dispatch('wallet/getBalances', null, { root: true })
      await dispatch('wallet/getAllowance', null, { root: true })
    })
  },
  async getBalance({ commit, state, rootState }) {
    const daiBalance = await rootState.daiToken.contract.balanceOf(state.owner)
    commit('setDaiBalance', daiBalance)
    const heihkdBalance = await state.contract.balanceOf(
      process.env.heihkdContractAddress
    )
    commit('setHeihkdBalance', heihkdBalance)
  },
  async getExchangeRate({ commit, state }) {
    const fromDaiToHeihkd =
      await state.contract.getExchangeRateFromDaiToHeihkd()
    const fromHeihkdToDai =
      await state.contract.getExchangeRateFromHeihkdToDai()
    commit('setExchangeRateFromDaiToHeiHkd', fromDaiToHeihkd)
    commit('setExchangeRateFromHeihkdToDai', fromHeihkdToDai)
  },
}
