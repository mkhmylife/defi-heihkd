const DAIToken = artifacts.require('./DAIToken.sol')
const HeiHKDToken = artifacts.require('./HeiHKDToken.sol')

module.exports = async function(deployer, network, accounts) {
	const owner = accounts[0]
	const investor = accounts[1]

	if (network === 'mainnet') {
		await deployer.deploy(
			HeiHKDToken,
			'0x55d398326f99059fF775485246999027B3197955'
		)
	} else {
		await deployer.deploy(DAIToken)
		const daiToken = await DAIToken.deployed()
		await deployer.deploy(HeiHKDToken, daiToken.address)
	}
	const heihkdToken = await HeiHKDToken.deployed()

	if (network === 'mainnet') {

	} else if (network === 'testnet') {
		await daiToken.transfer(heihkdToken.address, '20000000000000000000000')
		await daiToken.transfer(owner, '70000000000000000000000')
	} else {
		await daiToken.transfer(heihkdToken.address, '20000000000000000000000')
		await daiToken.transfer(investor, '70000000000000000000000')
	}

	await heihkdToken.mint('1000000000000000000000')
}
