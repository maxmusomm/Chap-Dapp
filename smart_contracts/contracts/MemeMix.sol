// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.28;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MemeMix is ERC721 {
    address public owner;
    uint256 public totalTokens;
    uint256 public totalRooms;

    //id of room -> room
    mapping(uint256 => Room) public rooms;
    //id -> account -> is in room
    mapping(uint256 => mapping(address => bool)) public joinedRooms;

    //Rooms
    struct Room {
        string name;
        uint256 cost;
        uint256 id;
    }

    constructor() ERC721("MemeMix", "MMX") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        (bool s, ) = owner.call{value: balance}("");
        require(s, "Withdraw failed");
    }

    function createRoom(string memory _name, uint256 _cost) public onlyOwner {
        totalRooms++;
        rooms[totalRooms] = Room({name: _name, cost: _cost, id: totalRooms});
    }

    //User Functions
    //Function for user to join a room and gets charged too

    function hasJoinedRoom(
        uint _id,
        address _account
    ) public view returns (bool) {
        return joinedRooms[_id][_account];
    }

    function mint(uint256 _id) external payable {
        require(hasJoinedRoom(_id, msg.sender) == false);
        require(msg.value >= rooms[_id].cost);
        require(_id <= totalRooms, "Invalid room ID");
        require(address(this).balance > 0);

        totalTokens++;
        joinedRooms[_id][msg.sender] = true;

        _safeMint(msg.sender, totalTokens);
    }

    // Just returns the room. What more do you want? 🙃
    function getRoom(uint256 _id) external view returns (Room memory) {
        return rooms[_id];
    }
}
