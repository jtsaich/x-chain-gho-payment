//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "./ERC721.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract ERC721_Factory {
    event CreateNFTCollection(address creator, address collection);
    /**
     * @notice ERC721 Implementation address.
     */
    address public ERC721Impl;

    constructor(address _ERC721Impl) {
        ERC721Impl = _ERC721Impl;
    }

    function setupNFTCollection(
        string memory _contract_name,
        string memory _symbol_name,
        uint256 _salePrice,
        uint256 _maxSupply,
        bytes32 salt
    ) external returns (address) {
        address clone = Clones.cloneDeterministic(ERC721Impl, salt);
        ERC721(clone).initialize(
            _contract_name,
            _symbol_name,
            _salePrice,
            _maxSupply,
            msg.sender
        );
        emit CreateNFTCollection(msg.sender, clone);
        return clone;
    }
}
