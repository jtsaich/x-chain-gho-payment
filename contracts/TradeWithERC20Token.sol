// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract TradeWithERC20Token is Ownable {
    struct Listing {
        address owner;
        uint256 price;
        address erc20;
    }

    // nft contract address => nft id => listed or not
    mapping(address => mapping(uint256 => Listing)) public listings;

    constructor() Ownable(msg.sender) {}

    function sell(
        address nftContract,
        uint256 tokenId,
        uint256 price,
        address erc20
    ) external {
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        listings[nftContract][tokenId] = Listing(msg.sender, price, erc20);
    }

    function buy(address nftContract, uint256 tokenId) external {
        Listing memory listing = listings[nftContract][tokenId];
        require(
            listing.owner != address(0),
            "Cannot find the NFT in the listing"
        );

        IERC20(listing.erc20).transferFrom(
            msg.sender,
            listing.owner,
            listing.price
        );
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

        listings[nftContract][tokenId] = Listing(address(0), 0, address(0));
    }
}
