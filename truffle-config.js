const HDWalletProvider = require('@truffle/hdwallet-provider')
const fs = require('fs')
const mnemonicTestnet = fs.readFileSync('.secret.test').toString().trim()
const mnemonicMainnet = fs.readFileSync('.secret.main').toString().trim()

module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration>
	// to customize your Truffle configuration!
	plugins: ['truffle-plugin-verify'],
	api_keys: {
		bscscan: '2WF9EWEQ1XFXME91DPHQD9I2ZGEUM57IYJ',
	},
	networks: {
		development: {
			host: '127.0.0.1',
			port: 7545,
			network_id: '*', // Match any network id
		},
		testnet: {
			provider: () =>
				new HDWalletProvider(
					mnemonicTestnet,
					`https://data-seed-prebsc-1-s1.binance.org:8545`
				),
			network_id: 97,
			confirmations: 10,
			timeoutBlocks: 200,
			skipDryRun: true,
			networkCheckTimeout: 90000,
		},
		mainnet: {
			provider: () =>
				new HDWalletProvider(
					mnemonicMainnet,
					`https://bsc-dataseed1.binance.org`
				),
			network_id: 56,
			confirmations: 10,
			networkCheckTimeout: 1000000,
			timeoutBlocks: 200,
		},
	},

	// Set default mocha options here, use special reporters etc.
	mocha: {
		timeout: 100000,
	},

	// Configure your compilers
	compilers: {
		solc: {
			version: '0.5.16',
			settings: {
				optimizer: {
					enabled: false,
					runs: 200,
				},
				evmVersion: 'byzantium',
			},
		},
	},
}
