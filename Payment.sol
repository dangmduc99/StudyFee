//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.9;
pragma experimental ABIEncoderV2;

contract UserManager {
    struct Student {
        string name;
        string studentId;
        string password;
        bool isStudent;
    }

    struct Transaction {
        string transactionId;
        string studentId;
        uint schoolYear;
        uint studyFee;
        string state;
        string dateStart;
        string dueDate;
        string paidDate;
    }

    struct School {
        string userName;
        string password;
        string addr;
    }


    mapping (string => Student) public students;
    mapping (string => Transaction) public transactions;
    mapping (string => School) public schools;

    function signUp(string memory studentId,
                    string memory _name,
                    string memory _password) public {
        students[studentId] = Student(studentId, _name, _password, true);
    }

    function signIn(string memory studentId, string memory _password) public view returns (Student memory) {
        Student storage student = students[studentId];
        if (student.password == _password) {
            return student;
        } else {
            
        }
    }

    function updateStudent(string memory std_id,
                        string memory _name,
                        string memory _password) public {
        Student storage student = students[std_id];
        student.name = _name;
        student.password = _password;
    }
}