// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract World {
    // lets create a mapping to keep track of the original owner of the sword
    mapping(address => mapping(uint256 => address)) public tokenOwners;

    event ItemImported(address indexed sword, uint256 indexed tokenId);
    event ItemExported(address indexed sword, uint256 indexed tokenId);
    // lets create a function called importItem, which will transferFrom the sword to this contract
    function importItem(address sword, uint256 tokenId) public {    
        IERC721(sword).transferFrom(msg.sender, address(this), tokenId);
        // lets keep track of the original owner of the sword
        // it should map the address of the owner to the nft to tokenid
        tokenOwners[sword][tokenId] = msg.sender;
        emit ItemImported(sword, tokenId);
    }

    // lets create a function called exportItem, which will transferFrom this contract to the original owner
    function exportItem(address sword, uint256 tokenId) public {
        // lets check if the original owner is the same as the one calling the function
        require(tokenOwners[sword][tokenId] == msg.sender, "You are not the original owner");
        IERC721(sword).transferFrom(address(this), tokenOwners[sword][tokenId], tokenId);
        // lets delete the mapping
        delete tokenOwners[sword][tokenId];
        emit ItemExported(sword, tokenId);
    }

}
