const DaiToken = artifacts.require('./DaiToken.sol')
const HeihkdToken = artifacts.require('./HeihkdToken.sol')

module.exports = async function(deployer, network, accounts) {
	const owner = accounts[0]

	switch (network) {
		case 'mainnet':
			await deployer.deploy(
				HeihkdToken,
				'0x55d398326f99059fF775485246999027B3197955' //USDT mainlet contract address
			)
			break
		case 'testnet':
		default:
			await deployer.deploy(DaiToken, '100000000000000000000000')
			const daiToken = await DaiToken.deployed()
			await deployer.deploy(HeihkdToken, daiToken.address)
			const heihkdToken = await HeihkdToken.deployed()
			await daiToken.transfer(heihkdToken.address, '20000000000000000000000')
			await heihkdToken.mint('1000000000000000000000')
			break
	}
}
