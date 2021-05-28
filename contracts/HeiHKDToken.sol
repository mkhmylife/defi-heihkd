pragma solidity ^0.5.16;

import "./bep20/BEP20.sol";

contract HeiHKDToken is Context, IBEP20, Ownable {

    using SafeMath for uint256;

    mapping (address => uint256) private _balances;
    mapping (address => mapping (address => uint256)) private _allowances;

    uint256 private _totalSupply;
    uint8 private _decimals;
    string private _symbol;
    string private _name;
    address _daiAddress;

    uint256 private _exchangeRateFromDaiToHeihkd = 7595;
    uint256 private _exchangeRateFromHeihkdToDai = 7905;

    constructor(address DaiAddress) public {
        _daiAddress = DaiAddress;
        _name = "Hei HKD";
        _symbol = "HEIHKD";
        _decimals = 18;
        _totalSupply = 0;
        _balances[msg.sender] = _totalSupply;

        emit Transfer(address(this), msg.sender, _totalSupply);
    }

    /**
     * @dev Creates `amount` tokens and assigns them to `msg.sender`, increasing
     * the total supply.
     *
     * Requirements
     *
     * - `msg.sender` must be the token owner
     */
    function mint(uint256 amount) public onlyOwner returns (bool) {
        IBEP20 daiToken = IBEP20(_daiAddress);
        uint256 ownerDaiBalance = daiToken.balanceOf(address(this));
        require(ownerDaiBalance >= (amount.add(_totalSupply)), "HEIHKD: Owner doesn't have enough DAI to mint HEIHKD");
        _mint(address(this), amount);
        return true;
    }

    /**
     * @dev Get owner DAI balance
     * sender will transfer DAI to this contract
     * owner will transfer HeiHKD to sender
     */
    function daiBalance() public returns (uint256) {
        IBEP20 daiToken = IBEP20(_daiAddress);
        uint256 ownerDaiBalance = daiToken.balanceOf(address(this));
        return ownerDaiBalance;
    }

    /**
     * @dev Swap DAI for HeiHKD
     * sender will transfer DAI to this contract
     * owner will transfer HeiHKD to sender
     */
    function swapDaiForHeihkd(uint256 amountDai) public {
        IBEP20 daiToken = IBEP20(_daiAddress);
        uint256 amountHeihkd = amountDai.mul(_exchangeRateFromDaiToHeihkd).div(1000);
        uint256 contractHeihkdBalance = _balances[address(this)];
        require(contractHeihkdBalance >= amountHeihkd, "HEIHKD: Contract doesn't have enough HEIHKI to swap for DAI");

        daiToken.transferFrom(_msgSender(), address(this), amountDai);
        _transfer(address(this), _msgSender(), amountHeihkd);
    }

    /**
     * @dev Swap DAI for HeiHKD
     * sender will transfer DAI to this contract
     * owner will transfer HeiHKD to sender
     */
    function swapHeihkdForDai(uint256 amountHeihkd) public {
        IBEP20 daiToken = IBEP20(_daiAddress);
        uint256 amountDai = amountHeihkd.mul(1000).div(_exchangeRateFromHeihkdToDai);

        uint256 contractDaiBalance = daiBalance();
        require(contractDaiBalance >= amountDai, "HEIHKD: Owner doesn't have enough DAI to swap for HEIHKD");

        _transfer(_msgSender(), address(this), amountHeihkd);
        daiToken.approve(address(this), amountDai);
        daiToken.transferFrom(address(this), _msgSender(), amountDai);
    }

    /**
     * @dev Transfer DAI from contract account to owner
     */
    function transferDaiToOwner(uint256 _amount) public onlyOwner returns (bool) {
        uint256 daiBalance = daiBalance();
        uint256 minimumDaiAmount = _totalSupply.mul(_exchangeRateFromHeihkdToDai);
        require(daiBalance.add(_amount) < minimumDaiAmount , "HEIHKD: Contract will not have enough DAI to maintain the exchange rate");

        IBEP20 daiToken = IBEP20(_daiAddress);
        daiToken.approve(address(this), _amount);
        daiToken.transferFrom(address(this), owner(), _amount);
        return true;
    }

    /**
     * @dev Returns the exchange rate from dai to heihkd
     */
    function getExchangeRateFromDaiToHeihkd() external view returns (uint256) {
        return _exchangeRateFromDaiToHeihkd;
    }

    /**
     * @dev Returns the exchange rate from heihkd to dai
     */
    function getExchangeRateFromHeihkdToDai() external view returns (uint256) {
        return _exchangeRateFromHeihkdToDai;
    }

    /**
     * @dev Returns the bep token owner.
     */
    function getOwner() external view returns (address) {
        return owner();
    }

    /**
     * @dev Returns the token decimals.
     */
    function decimals() external view returns (uint8) {
        return _decimals;
    }

    /**
     * @dev Returns the token symbol.
     */
    function symbol() external view returns (string memory) {
        return _symbol;
    }

    /**
    * @dev Returns the token name.
    */
    function name() external view returns (string memory) {
        return _name;
    }

    /**
     * @dev See {HEIHKD-totalSupply}.
     */
    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev See {HEIHKD-balanceOf}.
     */
    function balanceOf(address account) external view returns (uint256) {
        return _balances[account];
    }

    /**
     * @dev See {HEIHKD-transfer}.
     *
     * Requirements:
     *
     * - `recipient` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address recipient, uint256 amount) external returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

    /**
     * @dev See {HEIHKD-allowance}.
     */
    function allowance(address owner, address spender) external view returns (uint256) {
        return _allowances[owner][spender];
    }

    /**
     * @dev See {HEIHKD-approve}.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(address spender, uint256 amount) external returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }

    /**
     * @dev See {HEIHKD-transferFrom}.
     *
     * Emits an {Approval} event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of {HEIHKD};
     *
     * Requirements:
     * - `sender` and `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     * - the caller must have allowance for `sender`'s tokens of at least
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "HEIHKD: transfer amount exceeds allowance"));
        return true;
    }

    /**
     * @dev Atomically increases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {HEIHKD-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }

    /**
     * @dev Atomically decreases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {HEIHKD-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `spender` must have allowance for the caller of at least
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue, "HEIHKD: decreased allowance below zero"));
        return true;
    }

    /**
     * @dev Moves tokens `amount` from `sender` to `recipient`.
     *
     * This is internal function is equivalent to {transfer}, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a {Transfer} event.
     *
     * Requirements:
     *
     * - `sender` cannot be the zero address.
     * - `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "HEIHKD: transfer from the zero address");
        require(recipient != address(0), "HEIHKD: transfer to the zero address");

        _balances[sender] = _balances[sender].sub(amount, "HEIHKD: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(sender, recipient, amount);
    }

    /** @dev Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     *
     * Requirements
     *
     * - `to` cannot be the zero address.
     */
    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "HEIHKD: mint to the zero address");

        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`, reducing the
     * total supply.
     *
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * Requirements
     *
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     */
    function _burn(address account, uint256 amount) internal {
        require(account != address(0), "HEIHKD: burn from the zero address");

        _balances[account] = _balances[account].sub(amount, "HEIHKD: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }

    /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner`s tokens.
     *
     * This is internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(address owner, address spender, uint256 amount) internal {
        require(owner != address(0), "HEIHKD: approve from the zero address");
        require(spender != address(0), "HEIHKD: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`.`amount` is then deducted
     * from the caller's allowance.
     *
     * See {_burn} and {_approve}.
     */
    function _burnFrom(address account, uint256 amount) internal {
        _burn(account, amount);
        _approve(account, _msgSender(), _allowances[account][_msgSender()].sub(amount, "HEIHKD: burn amount exceeds allowance"));
    }
}