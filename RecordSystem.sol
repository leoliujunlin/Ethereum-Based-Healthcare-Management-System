// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;
// Our first contract is a faucet
contract RecordSystem{
 address Owner;

  struct Record{
        string PatientName;
        string In_time;
        string Out_time;
        string Fee;
        uint recordId;
    }

    Record[] records;
    
 constructor () {
 Owner = msg.sender;
 Record record;
 record.PatientName='jack';
record.In_time='2000.01.01';
record.Out_time='2000.02.02';
reocrd.Fee='500';
 Record[0] = record; 
 
 }


 
 modifier onlyOwner {
 require(msg.sender == Owner, "Not Owner");
 _;
 }
 function CreateRecord(string calldata pn,string calldata it,string calldata ot,string calldata f) public {
    Record memory temp;
    temp.PatientName = pn;
    temp.In_time = it;
    temp.Out_time = ot;
    temp.Fee = f;
    temp.recordId = records.length + 1;
    records.push(temp);
 }
 
 function QueryARecord(uint recordId) public view returns(Record memory){
    return records[recordId];
 }

 function QueryAllRecord() public view returns(Record[] memory){
    return records;
 }
 // Give out ether to anyone who asks
 
 
 function withdraw(uint withdraw_amount) public onlyOwner {
 // Limit withdrawal amount
 require(withdraw_amount <= 100000000000000000);
 // Send the amount to the address that request it
 payable(msg.sender).transfer(withdraw_amount);
 }



 function transfer(address payable _to, uint _amount) public onlyOwner {
 _to.transfer(_amount);
 }
 receive() external payable {}
 fallback() external payable {}
}
