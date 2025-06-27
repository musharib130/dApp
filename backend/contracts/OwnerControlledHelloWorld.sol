// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OwnerControlledHelloWorld {
    string private message = "Hello, World!";
    address private owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event MessageUpdated(string newMessage);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

    function setMessage(string memory _newMessage) public onlyOwner {
        message = _newMessage;
        emit MessageUpdated(_newMessage);
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        require(_newOwner != address(0), "New owner cannot be the zero address");
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }

    function getOwner() public view returns (address) {
        return owner;
    }
}