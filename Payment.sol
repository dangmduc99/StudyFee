//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.9;
pragma experimental ABIEncoderV2;

contract Manager {
    struct User {
        string userName;
        string name;
        string password;
        bool isStudent;
        string addr;
        string publicKey;
        string privateKey;
    }

    struct Class {
        string classId;
        string subjectId;
        string subject;
        string weight;
    }

    struct Registed {
        string userName;
        string studyYear;
        string[] classIdList;
    }

    struct PayFee {
        string userName;
        string studyYear;
        string amount;
        string date;
        string transactionId;
    }
    mapping (string => User) public users;
    mapping (string => Class) public classes;
    mapping (string => Registed) public registeds;
    mapping (string => PayFee) public payFees;


    //for signup
    function createUser (string memory _userName,
                    string memory _name,
                    string memory _password,
                    string memory _address,
                    string memory _publicKey,
                    string memory _privateKey) public {
        users[_userName] = User(_userName, _name, _password, true, _address, _publicKey, _privateKey);
    }


    //for login
    function getUser (string memory userName) public view returns (User memory) {
        User storage user = users[userName];
        return user;
    }

    //for update profile
    function updateUser (string memory userName,
                        string memory _name,
                        string memory _password) public {
        User storage user = users[userName];
        user.name = _name;
        user.password = _password;
    }

    //for create class
    function createClass (string memory _classId,
                        string memory _subjectId,
                        string memory _subject,
                        string memory _weight) public {
        classes[_classId] = Class(_classId, _subjectId, _subject, _weight);
    }

    //for get class
    function getClass (string memory classId) public view returns (Class memory) {
        Class storage class = classes[classId];
        return class;
    }


    //for edit class
    function editSubject (string memory classId,
                        string memory _subjectId,
                        string memory _subject,
                        string memory _weight) public {
        Class storage class = classes[classId];
        class.subjectId = _subjectId;
        class.subject = _subject;
        class.weight = _weight;
    }

    //for register class
    function registerClass (string memory _studentId,
                        string memory _studyYear,
                        string[] memory _classIdList) public {
        registeds[_studentId] = Registed(_studentId, _studyYear, _classIdList);
    }

    //for save history
    function payFee (string memory _userName,
                    string memory _studyYear,
                    string memory _amount,
                    string memory _date,
                    string memory _transactionId) public {
        payFees[_transactionId] = PayFee(_userName, _studyYear, _amount, _date, _transactionId);
    }

    //tranfer
}