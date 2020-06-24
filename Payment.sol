pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract UserManager {
    struct User {
        string public_key;
        string private_key;
        string password;
        string role;
    }

    struct Student {
        string name;
        uint std_id;
    }

    struct School {
        string addr;
    }

    address server = address(0x1223434t5y);
    mapping (string => User) public users;
    mapping (string => Student) public students;
    mapping (string => School) public schools;

    function createUser(string memory userName, string memory _private_key, string memory _public_key, string memory _password, string _role) {
        require(msg.sender == server, "Permission denied!");
        users[userName] = User(_public_key, _private_key, _password, _role);
    }

    function getUser(string memory userName) public view returns (User memory) {
        User storage user = users[userName];
        return user;
    }

    function updateUser() {
        
    }
}