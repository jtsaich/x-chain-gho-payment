// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

contract Soul {
    address[] public accounts;
    address public owner;
    string public avatorCid;

    // string public tokenType;
    string public name;
    struct token{
        string cid;
        string name;
        string description;
    }

    mapping(string tokenType => token) shelves;

    constructor(string memory _name){
        name = _name;
        owner = msg.sender;
    }

    function addNewWallet(address _accountAddress) public {
        accounts.push(_accountAddress);
    }

    function getAvatarCid() public view returns(string memory) {
        return avatorCid;
    }

    function updateAvatarCid(string memory _cid) public {
        require(owner != msg.sender, "Only owner update avator");
        avatorCid = _cid;
    }

}