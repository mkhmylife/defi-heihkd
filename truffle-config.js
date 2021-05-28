const HDWalletProvider = require('@truffle/hdwallet-provider')
const fs = require('fs')
const mnemonic = fs
	.readFileSync('.secret')
	.toString()
	.trim()

module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration>
	// to customize your Truffle configuration!
	plugins: ['truffle-plugin-verify'],
	api_keys: {
		bscscan: ''
	},
	networks: {
		development: {
			host: '127.0.0.1',
			port: 7545,
			network_id: '*' // Match any network id
		},
		testnet: {
			provider: () =>
				new HDWalletProvider(
					mnemonic,
					`https://data-seed-prebsc-1-s1.binance.org:8545`
				),
			network_id: 97,
			confirmations: 2,
			timeoutBlocks: 200,
			skipDryRun: false,
			networkCheckTimeout: 90000
		}
	},

	// Set default mocha options here, use special reporters etc.
	mocha: {
		timeout: 100000
	},

	// Configure your compilers
	compilers: {
		solc: {
			version: '0.5.16',
			settings: {
				optimizer: {
					enabled: false,
					runs: 200
				},
				evmVersion: 'byzantium'
			}
		}
	}
}
