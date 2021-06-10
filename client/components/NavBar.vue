<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand to="/"
      ><img src="~assets/logo.svg" width="30" class='mr-1' /> HEIHKD Token
      Swap</b-navbar-brand
    >

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#"></b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-button v-if="!connected" @click="connectWallet"
          >Connect Wallet</b-button
        >
        <template v-else>
          <span class="text-white">{{ daiBalance }} DAI</span>
          <span class="text-white ml-sm-4">{{ heihkdBalance }} HEIHKD</span>
          <span class="text-white ml-sm-4">{{ account }}</span>
        </template>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters({
      account: 'wallet/accountTruncated',
      daiBalance: 'wallet/daiBalanceFormatted',
      heihkdBalance: 'wallet/heihkdBalanceFormatted',
    }),
    ...mapState({
      connected: 'connected',
    }),
  },
  methods: {
    connectWallet() {
      this.$store.dispatch('connectWallet')
    },
  },
}
</script>
