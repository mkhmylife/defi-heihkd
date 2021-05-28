import { formatEther, getProvider } from '~/utils/ether'

export const state = () => ({
  account: null,
  daiBalance: 0,
  heihkdBalance: 0,
  daiAllowance: 0,
  heihkdAllowance: 0,
})

export const getters = {
  accountTruncated: (state) => {
    if (state.account) {
      return `${state.account.substr(0, 8)}...`
    }
    return null
  },
  daiBalanceFormatted: (state) => formatEther(state.daiBalance),
  heihkdBalanceFormatted: (state) => formatEther(state.heihkdBalance),
  daiAllowanceFormatted: (state) => formatEther(state.daiAllowance),
  heihkdAllowanceFormatted: (state) => formatEther(state.heihkdAllowance),
}

export const mutations = {
  setAccount(state, account) {
    state.account = account
  },
  setDaiBalance(state, balance) {
    state.daiBalance = balance
  },
  setHeihkdBalance(state, balance) {
    state.heihkdBalance = balance
  },
  setDaiAllowance(state, allowance) {
    state.daiAllowance = allowance
  },
  setHeihkdAllowance(state, allowance) {
    state.heihkdAllowance = allowance
  },
}

export const actions = {
  async getAccount({ commit, dispatch }) {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    commit('setAccount', accounts.length > 0 ? accounts[0] : null)
    ethereum.on('accountsChanged', (accounts) =>
      commit('setAccount', accounts.length > 0 ? accounts[0] : null)
    )
    await dispatch('getBalances')
    await dispatch('getAllowance')
  },
  async getBalances({ commit, state, rootState }) {
    const daiBalance = await rootState.daiToken.contract.balanceOf(
      state.account
    )
    const heihkdBalance = await rootState.heihkdToken.contract.balanceOf(
      state.account
    )
    commit('setDaiBalance', daiBalance)
    commit('setHeihkdBalance', heihkdBalance)
  },
  async getAllowance({ commit, state, rootState }) {
    const daiAllowance = await rootState.daiToken.contract.allowance(
      state.account,
      process.env.heihkdContractAddress
    )
    const heihkdAllowance = await rootState.heihkdToken.contract.allowance(
      state.account,
      process.env.heihkdContractAddress
    )
    commit('setDaiAllowance', daiAllowance)
    commit('setHeihkdAllowance', heihkdAllowance)
  },
}
