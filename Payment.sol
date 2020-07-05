//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.9;
pragma experimental ABIEncoderV2;

contract Manager {
    struct Student {
        string studentId;
        string studentName;
        string password;
        bool isStudent;
        string addr;
        string publicKey;
        string privateKey;
    }

    struct Subject {
        string subjectId;
        string subject;
        string num;
    }

    struct Class {
        string classId;
        string subjectId;
        string classRoom;
    }

    struct Transaction {
        string transactionId;
        string studentId;
        string receiver;
        string amount;
        string datetime;
    }

    struct StudyFee {
        // string Id;
        string studentId;
        string studyFee;
        string dueDate;
    }


    mapping (string => Student) public students;
    mapping (string => Subject) public subjects;
    mapping (string => Class) public classes;
    mapping (string => Transaction) public transactions;
    mapping (string => StudyFee) public studyFees;


    //for sign up
    function createStudent (string memory _studentId,
                    string memory _studentName,
                    string memory _password) public {
        students[_studentId] = Student(_studentId, _studentName, _password, true, '', '', '');
    }


    //for sign in
    function getStudent (string memory studentId) public view returns (Student memory) {
        Student storage student = students[studentId];
        return student;
    }

    //for update profile
    function updateStudent (string memory studentId,
                        string memory _studentName,
                        string memory _password) public {
        Student storage student = students[studentId];
        student.studentName = _studentName;
        student.password = _password;
    }

    //for create subject
    function createSubject (string memory _subjectId,
                        string memory _subject,
                        string memory _num) public {
        subjects[_subjectId] = Subject(_subjectId, _subject, _num);
    }

    //for edit subject
    function editSubject (string memory subjectId,
                        string memory _subject,
                        string memory _num) public {
        Subject storage subject = subjects[subjectId];
        subject.subject = _subject;
        subject.num = _num;
    }

    //for create class
    function createClass (string memory _classId,
                        string memory _subjectId,
                        string memory _classRoom) public {
        classes[_classId] = Class(_classId, _subjectId, _classRoom);
    }

    //for edit class
    function editClass (string memory classId,
                        string memory _subjectId,
                        string memory _classRoom) public {
        Class storage class = classes[classId];
        class.subjectId = _subjectId;
        class.classRoom = _classRoom;
    }

    //for register class
    function registerClass (string memory _studentId,
                        string memory _studyFee,
                        string memory _dueDate) public {
        studyFees[_studentId] = StudyFee(_studentId, _studyFee, _dueDate);
    }

    //for save transaction information
    function transaction (string memory _transactionId,
                        string memory _studentId,
                        string memory _receiver,
                        string memory _amount,
                        string memory _dateTime) public {
        transactions[_transactionId] = Transaction(_transactionId, _studentId, _receiver, _amount, _dateTime);
    }
}