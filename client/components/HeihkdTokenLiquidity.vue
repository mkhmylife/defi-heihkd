<template>
  <div>
    <h3 class="mb-3">Liquidity</h3>
    <div class="row">
      <div class="col-sm-6 mb-3 mb-sm-0">
        <b-card class="text-center">{{ diaBalance }} DAI</b-card>
      </div>
      <div class="col-sm-6">
        <b-card class="text-center"> {{ heihkdBalance }} HEIHKD</b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HeihkdTokenLiquidity',
  computed: mapGetters({
    diaBalance: 'heihkdToken/daiBalanceFormatted',
    heihkdBalance: 'heihkdToken/heihkdBalanceFormatted',
  }),
}
</script>
