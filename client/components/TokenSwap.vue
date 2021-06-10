<template>
  <div>
    <h3 class="mb-3">Token Swap</h3>
    <b-card class="mb-4">
      <b-form>
        <div class="mb-3">Rate: 1 DAI = {{ buyRate }} HEIHKD</div>
        <div
          class="
            d-block d-sm-flex
            justify-content-between
            align-items-center
            mb-4
          "
        >
          <b-form-group class="w-100 mb-0">
            <b-input-group append="DAI">
              <b-form-input
                v-model="fromDai"
                type="number"
                min="1"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
          <div class="mx-5 text-center my-2 my-sm-0">To</div>
          <b-form-group class="w-100 mb-0">
            <b-input-group append="HEIHKD">
              <b-form-input
                v-model="toHeihkd"
                type="number"
                readonly
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </div>
        <div class="text-center">
          <b-button
            v-if="!needsToApproveFromDaiToHeihkd"
            :disabled="!canSwapFromDaiToHeihkd"
            variant="dark"
            block
            @click="swap('toHeihkd')"
            >Swap</b-button
          >
          <b-button v-else variant="dark" block @click="approve('toHeihkd')"
            >Approve</b-button
          >
        </div>
      </b-form>
    </b-card>
    <b-card>
      <b-form>
        <div class="mb-3">Rate: 1 HEIHKD = {{ sellRate }} DAI</div>
        <div
          class="
            d-block d-sm-flex
            justify-content-between
            align-items-center
            mb-4
          "
        >
          <b-form-group class="w-100 mb-0">
            <b-input-group append="HEIHKD">
              <b-form-input
                v-model="fromHeihkd"
                type="number"
                min="1"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
          <div class="mx-5 text-center my-2 my-sm-0">To</div>
          <b-form-group class="w-100 mb-0">
            <b-input-group append="DAI">
              <b-form-input
                v-model="toDai"
                type="number"
                readonly
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </div>
        <div class="text-center">
          <b-button
            v-if="!needsToApproveFromHeihkdToDai"
            :disabled="!canSwapFromHeihkdToDai"
            variant="dark"
            block
            @click="swap('toDai')"
            >Swap</b-button
          >
          <b-button v-else variant="dark" block @click="approve('toDai')"
            >Approve</b-button
          >
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { getSigner, parseEther } from '../utils/ether'

export default {
  name: 'TokenSwap',
  data() {
    return {
      fromDai: 10,
      fromHeihkd: 10,
    }
  },
  computed: {
    needsToApproveFromDaiToHeihkd() {
      return (
        parseFloat(this.$store.getters['wallet/daiAllowanceFormatted']) <
        this.fromDai
      )
    },
    needsToApproveFromHeihkdToDai() {
      return (
        parseFloat(this.$store.getters['wallet/heihkdAllowanceFormatted']) <
        this.fromHeihkd
      )
    },
    canSwapFromDaiToHeihkd() {
      return (
        this.$store.getters['heihkdToken/heihkdBalanceFormatted'] >
        this.toHeihkd
      )
    },
    canSwapFromHeihkdToDai() {
      return this.$store.getters['heihkdToken/daiBalanceFormatted'] > this.toDai
    },
    sellRate() {
      return this.$store.state.heihkdToken.sellRate
    },
    buyRate() {
      return this.$store.state.heihkdToken.buyRate
    },
    toHeihkd() {
      return this.fromDai * this.buyRate
    },
    toDai() {
      return this.fromHeihkd / this.sellRate
    },
  },
  methods: {
    async approve(direction) {
      const heihkdContract = this.$store.state.heihkdToken.contract
      const daiContract = this.$store.state.daiToken.contract
      const signer = await getSigner()
      const heihkdContractWithSigner = heihkdContract.connect(signer)
      const daiContractWithSigner = daiContract.connect(signer)
      try {
        switch (direction) {
          case 'toHeihkd':
            await daiContractWithSigner.approve(
              this.$config.heihkdContractAddress,
              parseEther(this.$store.getters['wallet/daiBalanceFormatted'])
            )
            break
          case 'toDai':
            await heihkdContractWithSigner.approve(
              this.$config.heihkdContractAddress,
              parseEther(this.$store.getters['wallet/heihkdBalanceFormatted'])
            )
            break
        }
      } catch (e) {
        console.error(e)
      }
    },
    async swap(direction) {
      const heihkdContract = this.$store.state.heihkdToken.contract
      const signer = await getSigner()
      const heihkdContractWithSigner = heihkdContract.connect(signer)
      switch (direction) {
        case 'toHeihkd':
          try {
            await heihkdContractWithSigner.swapDaiForHeihkd(
              parseEther(this.fromDai.toString())
            )
          } catch (e) {
            console.error(e)
          }
          break
        case 'toDai':
          try {
            await heihkdContractWithSigner.swapHeihkdForDai(
              parseEther(this.fromHeihkd.toString())
            )
          } catch (e) {
            console.error(e)
          }
          break
      }
    },
  },
}
</script>

<style lang="scss">
//.input-group input {
//  background-color: #424242;
//  color: #fff;
//
//  &[readonly] {
//    background-color: #424242;
//    color: #fff;
//  }
//}
</style>
