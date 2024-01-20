// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "./Soul.sol";

contract SoulFactory {
    string[] public stageNames;
    mapping(string => Soul) public souls;
    mapping(Soul => string) public soulsAddresses;

    struct soulStruct {
        string name;
        Soul addr;
    }

    constructor() {}

    function createSoul(string memory _stageName) public {
        if (address(souls[_stageName]) != address(0)) {
            revert("Soul already exists");
        }

        stageNames.push(_stageName);
        Soul soul = new Soul(_stageName);
        souls[_stageName] = soul;
        soulsAddresses[soul] = _stageName;
    }

    function getSouls() public view returns(soulStruct[] memory) {
        soulStruct[] memory _souls = new soulStruct[](stageNames.length);
        for (uint i = 0; i < stageNames.length; i++) {
            _souls[i] = soulStruct({name: stageNames[i], addr: souls[stageNames[i]]});
        }
        return _souls;
    }

    function getSoulByStageName(string memory _stageName) public view returns(Soul) {
        return souls[_stageName];
    }

    function getSoulByAddress(Soul _soulAddress) public view returns(string memory) {
        return soulsAddresses[_soulAddress];
    }
}