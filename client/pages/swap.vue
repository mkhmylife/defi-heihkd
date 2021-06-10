<template>
  <div>
    <NavBar />
    <section class="container">
      <client-only v-if="connected">
        <div class="py-5">
          <heihkd-token-liquidity />
        </div>
        <div class="pt-0 pt-sm-5 pb-5">
          <token-swap />
        </div>
      </client-only>
    </section>
  </div>
</template>

<script>
import TokenSwap from '../components/TokenSwap'
import HeihkdTokenLiquidity from '../components/HeihkdTokenLiquidity'
import NavBar from '../components/NavBar'
import { mapState } from 'vuex'

export default {
  components: { NavBar, HeihkdTokenLiquidity, TokenSwap },
  data() {
    return {}
  },
  computed: mapState({
    connected: 'connected',
  }),
  async mounted() {
    await this.$store.dispatch('connectWallet')
  },
  methods: {},
}
</script>

<style></style>
