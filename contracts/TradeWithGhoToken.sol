// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract TradeWithGhoToken is Ownable {
    IERC20 public ghoToken;

    struct Listing {
        address owner;
        uint256 price;
    }

    // nft contract address => nft id => listed or not
    mapping(address => mapping(uint256 => Listing)) public listings;

    constructor() Ownable(msg.sender) {
        ghoToken = IERC20(0xc4bF5CbDaBE595361438F8c6a187bDc330539c60); // sepolia
    }

    function sell(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) external {
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        listings[nftContract][tokenId] = Listing(msg.sender, price);
    }

    function buy(
        address nftContract,
        uint256 tokenId,
        uint256 amount
    ) external {
        Listing memory listing = listings[nftContract][tokenId];

        require(
            listing.owner != address(0),
            "Cannot find the NFT in the listing"
        );
        require(amount >= listing.price, "Not enough fund to buy");

        ghoToken.transferFrom(msg.sender, address(this), amount);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

        listings[nftContract][tokenId] = Listing(address(0), 0);
    }
}
