import { expect, use } from 'chai'
import { deployContract, MockProvider, solidity } from 'ethereum-waffle'
import DaiToken from '../build/contracts/DaiToken.json'
import HeihkdToken from '../build/contracts/HeihkdToken.json'

use(solidity)

function tokens(n) {
	return n * 1000
}

describe('HeihkdToken', () => {
	const [owner, investor] = new MockProvider().getWallets()
	let daiToken, heihkdToken, buyRate, sellRate

	before(async () => {
		daiToken = await deployContract(owner, DaiToken, [tokens(5000)])
		heihkdToken = await deployContract(owner, HeihkdToken, [daiToken.address])
		buyRate = await heihkdToken.getBuyRate()
		sellRate = await heihkdToken.getSellRate()
	})

	it('Assigns initial 5000 Dai balance to owner', async () => {
		expect(await daiToken.balanceOf(owner.address)).to.equal(tokens(5000))
	})

	// Now the owner has 5000 Dai

	it('Assigns initial 1000 Dai balance to Heihkd contract', async () => {
		await daiToken.transfer(heihkdToken.address, tokens(1000))
		expect(await daiToken.balanceOf(heihkdToken.address)).to.equal(tokens(1000))
	})

	// Now the owner has 4000 Dai, contract has 1000 Dai

	it('Has zero total supply', async () => {
		const totalSupply = await heihkdToken.totalSupply()
		expect(totalSupply).to.equal(0)
	})

	it('Can mint if it has enough DAI to support exchange rate', async () => {
		const amountToMint = (tokens(1000) * sellRate) / 100
		await heihkdToken.mint(amountToMint)
		const totalSupply = await heihkdToken.totalSupply()
		expect(totalSupply).to.equal(amountToMint)
	})

	// Now the owner has 4000 Dai, contract has 1000 Dai and 7800 Heihkd

	it('Cannot mint if it does not have enough DAI to support exchange rate', async () => {
		await expect(heihkdToken.mint((tokens(1000) * sellRate) / 100)).to.be
			.reverted
	})

	it('Can swap Dai to Heihkd', async () => {
		// Owner swap 1000 Dai for 7750 Heihkd
		await daiToken.approve(heihkdToken.address, tokens(1000))
		await heihkdToken.swapDaiForHeihkd(tokens(1000))

		const heihkdAmount = (tokens(1000) * buyRate) / 100
		expect(await daiToken.balanceOf(owner.address)).equal(tokens(3000))
		expect(await heihkdToken.balanceOf(owner.address)).equal(heihkdAmount)
		expect(await daiToken.balanceOf(heihkdToken.address)).equal(tokens(2000))
		expect(await heihkdToken.balanceOf(heihkdToken.address)).equal(
			tokens(7800) - heihkdAmount
		)

		const totalSupply = await heihkdToken.totalSupply()
		expect(totalSupply).to.equal(tokens(7800), 'Total supply is not 7800')
	})

	// Now the owner has 3000 Dai and 7750 Heihkd, contract has 2000 Dai and 50 Heihkd

	it('Cannot swap Dai to Heihkd if it does not has enough liquidity', async () => {
		await daiToken.approve(heihkdToken.address, tokens(3000))
		await expect(heihkdToken.swapDaiForHeihkd(tokens(3000))).to.be.reverted
	})

	it('Can swap Heihkd to Dai', async () => {
		// Owner swap 3900 Heihkd for 500 Dai
		await heihkdToken.approve(heihkdToken.address, tokens(3900))
		await heihkdToken.swapHeihkdForDai(tokens(3900))

		const daiAmount = (tokens(3900) / sellRate) * 100
		expect(await daiToken.balanceOf(owner.address)).equal(
			tokens(3000) + daiAmount
		)
		expect(await heihkdToken.balanceOf(owner.address)).equal(
			tokens(7750) - tokens(3900)
		)
		expect(await daiToken.balanceOf(heihkdToken.address)).equal(
			tokens(2000) - daiAmount
		)
		expect(await heihkdToken.balanceOf(heihkdToken.address)).equal(
			tokens(50) + tokens(3900)
		)
	})

	// Now the owner has 3500 Dai and 3850 Heihkd, contract has 1500 Dai and 3950 Heihkd

	it('Can withdraw dai to owner', async () => {
		await heihkdToken.transferDaiToOwner(tokens(100))
		expect(await daiToken.balanceOf(owner.address)).equal(tokens(3500 + 100))
	})

	// Now the owner has 3600 Dai and 3850 Heihkd, contract has 1400 Dai and 3950 Heihkd

	it('Cannot withdraw dai to owner if it does not have enough DAI to support exchange rate', async () => {
		await expect(heihkdToken.transferDaiToOwner(tokens(1400))).to.be.reverted
	})
})
