//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.9;
pragma experimental ABIEncoderV2;

contract UserManager {
    struct Student {
        string name;
        string std_id;
        string public_key;
        string private_key;
        string password;
        bool is_student;
    }

    struct School {
        string addr;
    }

    mapping (string => Student) public students;
    mapping (string => School) public schools;

    function signUp(string memory std_id,
                    string memory _name,
                    string memory _public_key,
                    string memory _private_key,
                    string memory _password) public {
        students[std_id] = Student(std_id, _name, _public_key, _private_key, _password, true);
    }

    function signIn(string memory std_id) public view returns (Student memory) {
        Student storage student = students[std_id];
        return student;
    }

    function updateStudent(string memory std_id,
                        string memory _name,
                        string memory _password) public {
        Student storage student = students[std_id];
        student.name = _name;
        student.password = _password;
    }
}