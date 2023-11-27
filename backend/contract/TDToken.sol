// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract TDToken {
    // The keyword "public" makes variables
    // accessible from other contracts
    address public minter;
    mapping(string => uint) public balances;
    mapping(string => string) public key_holder;
    mapping(string => bool) public allowed_ifs;

    // Events allow clients to react to specific
    // contract changes you declare
    event Sent(string from, string to, uint amount);

    // Constructor code is only run when the contract
    // is created
    constructor() {
        minter = msg.sender;
    }

    // TD Actions

    // Sends an amount of newly created coins to an address
    function mint(string memory receiver, uint amount) public {
        require(msg.sender == minter);
        balances[receiver] += amount;
    }

    // Authorize if to transact
    function authorize(string memory financial_institution) public {
        require(msg.sender == minter);
        allowed_ifs[financial_institution] = true;
    }

    // Unauthorize if to transact
    function unauthorize(string memory financial_institution) public {
        require(msg.sender == minter);
        allowed_ifs[financial_institution] = false;
    }

    error InsufficientBalance(uint requested, uint available);
    error NotKeyHolder(string financial_institution, string key);
    error KeyAlreadyBinded(string financial_institution, string key);

    // IFs actions

    // Bind user key to financial institution
    function bind_key(string memory _financial_institution, string memory _key) public {
        require(allowed_ifs[_financial_institution]);
        if(!equals(key_holder[_key], ""))
            revert KeyAlreadyBinded({
                financial_institution: _financial_institution,
                key: _key
            });
        key_holder[_key] = _financial_institution;
    }

    // Sends an amount of existing coins
    // from any caller to an address
    function send(string memory _financial_institution, string memory sender, string memory receiver, uint amount) public {
        require(allowed_ifs[_financial_institution]);
        if(amount > balances[sender])
            revert InsufficientBalance({
                requested: amount,
                available: balances[sender]
            });
        
        if(!equals(key_holder[sender], _financial_institution))
            revert NotKeyHolder({
                financial_institution: _financial_institution,
                key: sender 
            });
        
        balances[sender] -= amount;
        balances[receiver] += amount;
        emit Sent(sender, receiver, amount);
    }

    function equals(string memory str1, string memory str2) private pure returns (bool) {
        if (bytes(str1).length != bytes(str2).length) {
            return false;
        }
        return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }
}