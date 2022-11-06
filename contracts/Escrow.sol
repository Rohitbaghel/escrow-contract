// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

// payer
// payee
// lawyer
// amount

contract Escrow {
    address public payer;
    address payable public payee;
    address public lawyer;
    uint public amount;
    bool public isWorkDone;

    constructor(
        address _payer,
        address payable _payee,
        uint _amount
    ) {
        payer = _payer;
        payee = _payee;
        lawyer = msg.sender;
        amount = _amount;
        isWorkDone = false;
    }

    function deposit() external payable {
        require(msg.sender == payer, "sender must be Payer");
        require(
            address(this).balance <= amount,
            "Amount should be less than or equal to the balance of the Payer"
        );
    }

    function WorkDone() external {
        require(msg.sender == payee, "sender must be Payee");
        isWorkDone = true;
    }

    function releaseFunds() external {
        require(msg.sender == lawyer, "sender must be Lawyer");
        require(
            address(this).balance == amount,
            "cannot release Funds :Insufficient funds"
        );
        require(isWorkDone == true, "Work is not Done yet");
        payee.transfer(amount);
    }

    function checkBalance() external view returns (uint) {
        return address(this).balance;
    }
}
