<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100 w-100">
    <div class="text-center">
      <b-img class="logo mb-3" src="~assets/logo.svg" />
      <h1 class="h3 mb-4">HEIHKD is soft-pegged with DAI</h1>
      <h2 class="h5">1 DAI can swap to 7.75 HEIHKD</h2>
      <h2 class="h5 mb-5">7.8 HEIHKD can swap to 1 DAI</h2>
      <b-button @click="connectWallet">Connect Wallet</b-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async connectWallet() {
      await this.$router.push('/swap')
    },
  },
}
</script>

<style lang="scss">
.logo {
  width: 180px;
}
</style>
