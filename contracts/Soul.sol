// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

contract Soul {
    address[] public accounts;

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
    }

    function addNewWallet(address _accountAddress) public {
        accounts.push(_accountAddress);
    }

    // function _createToken(string cid, string name, string description) private {
    //     require(cid == "", "CID can't be an empty string");
    //     require(name == "", "Name can't be an empty string");
    //     return token({cid, name, description});
    // }
}