const DaiToken = artifacts.require('./DaiToken.sol')
const HeihkdToken = artifacts.require('./HeihkdToken.sol')

module.exports = async function(deployer, network, accounts) {
	const owner = accounts[0]

	switch (network) {
		case 'mainnet':
			await deployer.deploy(
				HeihkdToken,
				'0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3' //DAI contract address in BSC mainnet
			)
			break
		case 'testnet':
		default:
			await deployer.deploy(DaiToken, '100000000000000000000000')
			const daiToken = await DaiToken.deployed()
			await deployer.deploy(HeihkdToken, daiToken.address)
			const heihkdToken = await HeihkdToken.deployed()
			await daiToken.transfer(heihkdToken.address, '20000000000000000000000')
			await heihkdToken.mint('10000000000000000000000')
			break
	}
}
