//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

contract Manager {
    struct User {
        string userName;
        string name;
        string password;
        bool isStudent;
        string addr;
        string privateKey;
        string[] transactionIdList;
        string[] classIdList;
    }

    struct Class {
        string classId;
        string subjectId;
        string subject;
        string weight;
    }

    struct Transaction {
        string transactionId;
        string amount;
        string date;
    }
    mapping (string => User) public users;
    mapping (string => Class) public classes;
    mapping (string => Transaction) public transactions;


    //for signup
    function createUser (string memory _userName,
                    string memory _name,
                    string memory _password,
                    string memory _address,
                    string memory _privateKey,
                    string[] memory _transactionIdList,
                    string[] memory _classIdList) public {
        users[_userName] = User(_userName, _name, _password, true, _address, _privateKey, _transactionIdList, _classIdList);
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
    function editClass (string memory classId,
                        string memory _subjectId,
                        string memory _subject,
                        string memory _weight) public {
        Class storage class = classes[classId];
        class.subjectId = _subjectId;
        class.subject = _subject;
        class.weight = _weight;
    }

    //for register class
    function registerClass (string memory userName,
                            string memory _classId) public {
        User storage user = users[userName];
        user.classIdList.push(_classId);
    }

    //for get transaction
    function getTransaction (string memory transactionId) public view returns (Transaction memory){
        Transaction storage transaction = transactions[transactionId];
        return transaction;
    }

    //for save history
    function transaction (string memory userName,
                    string memory _amount,
                    string memory _date,
                    string memory _transactionId) public {
        transactions[_transactionId] = Transaction(_transactionId, _amount, _date);
        User storage user = users[userName];
        user.transactionIdList.push(_transactionId);
    }
}