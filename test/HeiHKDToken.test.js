const DAIToken = artifacts.require('DAIToken')
const HeiHKDToken = artifacts.require('HeiHKDToken')

require('chai')
	.use(require('chai-as-promised'))
	.should()

function tokens(n) {
	return web3.utils.toWei(n, 'ether')
}

contract('HeiHKDToken', accounts => {
	let heiHKDToken, daiToken
	const owner = accounts[0]
	const investor = accounts[1]

	// This is to mock the migration
	before(async () => {
		daiToken = await DAIToken.new()
		heiHKDToken = await HeiHKDToken.new(daiToken.address)

		// Transfer 1000 DAI to HeiHKD contract and investor from owner
		await daiToken.transfer(heiHKDToken.address, tokens('1000'))
		await daiToken.transfer(investor, tokens('1000'))
	})

	describe('Mock HeiHKD Deployment', async () => {
		it('has a name', async () => {
			const name = await heiHKDToken.name()
			assert.equal(name, 'Hei HKD')
		})

		it('has zero token', async () => {
			const suppply = await heiHKDToken.totalSupply()
			assert.equal(suppply, 0)
		})

		it('owner has some DAI balance', async () => {
			const result = await daiToken.balanceOf(heiHKDToken.address)
			assert.equal(result.toString(), tokens('1000'))
		})

		it('investor has DAI balance', async () => {
			const result = await daiToken.balanceOf(investor)
			assert.equal(result.toString(), tokens('1000'))
		})
	})

	describe('Mint HeiHKD', async () => {
		it('can mint if has DIA', async () => {
			await heiHKDToken.mint(tokens('10'))

			const supply = await heiHKDToken.totalSupply()
			assert.equal(supply.toString(), tokens('10'))

			const contractHeiHKDBalance = await heiHKDToken.balanceOf(
				heiHKDToken.address
			)
			assert.equal(contractHeiHKDBalance.toString(), tokens('10'))
		})

		it("cannot mint if doesn't has DIA", async () => {
			await heiHKDToken.mint(tokens('1000000000000000')).should.be.rejected
		})

		it("cannot mint if isn't owner", async () => {
			await heiHKDToken.mint(tokens('10'), { from: investor }).should.be
				.rejected
		})
	})

	describe('Withdraw DAI', async () => {
		it('can withdraw DAI', async () => {
			// const ownerDaiBalanceBeforeWithdraw = await daiToken.balanceOf(owner)
			await heiHKDToken.transferDaiToOwner(tokens('1'), {
				from: owner
			})
			const ownerDaiBalanceAfterWithdraw = await daiToken.balanceOf(owner)
			// const balanceDiff =
			// 	ownerDaiBalanceAfterWithdraw - ownerDaiBalanceBeforeWithdraw
			assert.equal(
				ownerDaiBalanceAfterWithdraw.toString(),
				tokens('98001').toString()
			)
		})

		it('cannot withdraw DAI if not enough to maintain exchange rate', async () => {
			await heiHKDToken.transferDaiToOwner(tokens('9999'), { from: owner })
				.should.be.rejected
		})
	})

	describe('Token Swap', async () => {
		it('can swap from Dai to Heihkd', async () => {
			const contractDaiBalanceBeforeSwap = await daiToken.balanceOf(
				heiHKDToken.address
			)
			const investorDaiBalanceBeforeSwap = await daiToken.balanceOf(investor)

			// Investor approves DAI transfer to "HeiHKD contract"
			await daiToken.approve(heiHKDToken.address, tokens('100'), {
				from: investor
			})

			// Investor swap DAI for HeiHKD
			await heiHKDToken.swapDaiForHeihkd(tokens('100'), { from: investor })

			const contractDaiBalanceAfterSwap = await daiToken.balanceOf(
				heiHKDToken.address
			)
			const investorDaiBalanceAfterSwap = await daiToken.balanceOf(investor)

			const contractDaiBalanceDiff =
				contractDaiBalanceAfterSwap - contractDaiBalanceBeforeSwap
			const investorDaiBalanceDiff =
				investorDaiBalanceAfterSwap - investorDaiBalanceBeforeSwap
			assert.equal(contractDaiBalanceDiff, tokens('100'))
			assert.equal(investorDaiBalanceDiff, tokens('-100'))
		})

		// it('can swap from Heihkd to Dai', async () => {
		// 	// Investor approves HeiHKD transfer to "HeiHKD contract"
		// 	await heiHKDToken.approve(heiHKDToken.address, tokens('10'), {
		// 		from: investor
		// 	})
		//
		// 	// Investor swap DAI for HeiHKD
		// 	await heiHKDToken.swapHeihkdForDai(tokens('7.905'), { from: investor })
		//
		// 	const investorDaiBalanceAfterSwap = await daiToken.balanceOf(investor)
		//
		// 	assert.equal(investorDaiBalanceAfterSwap.toString(), tokens('1'))
		// })
	})
})
