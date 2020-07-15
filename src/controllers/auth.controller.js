var md5 = require('md5');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:3030'));
var Contract = require('web3-eth-contract');
Contract.setProvider('ws://localhost:3030');

var addr = "0x8d7f37F2a22492c8281DdA4861907B1CFd183C6C";
var privateKey = "0xcda2ce690f1d1c8a1e67b9819224fc38c6568f6d147f339bbdd7fbcfa261ea5b";
var server = '5a783e4645115f6986d19a395084f1970ac511f4';
var address = '29b3ae355818d8bc2512da8829879750f14fb938';
var transactionid = 'dcc12c1030d0288b74819ad79ce445354481d1e6bf685d88aed60c3f4260f5d747d53c5c6c3312f2396a5d55b4cf83669bb5114a46f9574fca33f07f716e4251';
var jsonInterface =
  [
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_userName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_password",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_address",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_privateKey",
          "type": "string"
        },
        {
          "internalType": "string[]",
          "name": "_transactionIdList",
          "type": "string[]"
        },
        {
          "internalType": "string[]",
          "name": "_classIdList",
          "type": "string[]"
        }
      ],
      "name": "createUser",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }, {
      "constant": true,
      "inputs": [
        {
          "internalType": "string",
          "name": "userName",
          "type": "string"
        }
      ],
      "name": "getUser",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "userName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "password",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "isStudent",
              "type": "bool"
            },
            {
              "internalType": "string",
              "name": "addr",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "privateKey",
              "type": "string"
            },
            {
              "internalType": "string[]",
              "name": "transactionIdList",
              "type": "string[]"
            },
            {
              "internalType": "string[]",
              "name": "classIdList",
              "type": "string[]"
            }
          ],
          "internalType": "struct Manager.User",
          "name": "",
          "type": "tuple"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "users",
      "outputs": [
        {
          "internalType": "string",
          "name": "userName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "password",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "isStudent",
          "type": "bool"
        },
        {
          "internalType": "string",
          "name": "addr",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "privateKey",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]

var contract = new Contract(jsonInterface, address);
var Accounts = require('web3-eth-accounts');
var accounts = new Accounts('ws://localhost:3030');


module.exports.login = function (req, res) {
  res.render('auth/login');
};

module.exports.postLogin = function (req, res) {
  var userName = req.body.inputUserName;
  var password = req.body.inputPassword;
  var rememberMe = req.body.rememberMe;


  var user = {
    "userName": userName,
    "name": '',
    "password": md5(password),
    "isStudent": '',
    "address": "",
    "privateKey": "",
    "transactionIdList": [],
    "classIdList": []
  }
  //get_user()
  async function getUser(address, userName) {
    var user = {};
    try {
      var _user = await contract.methods.getUser(userName).send({ "from": address }).call(function (err, result) {
        console.log(result);
      })
      if (_user[0] == '') {
        return user = {};
      }
      return user = {
        "userName": userName,
        "name": _user[1],
        "password": _user[2],
        "isStudent": _user[3],
        "address": _user[4],
        "publicKey": _user[5],
        "privateKey": _user[6]
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!user) {
    res.render('auth/login', {
      errors: [
        'User does not exist.'
      ],
      values: req.body
    });
    return;
  }

  var hashedPassword = md5(password);

  if (user.password !== hashedPassword) {
    res.render('auth/login', {
      errors: [
        'Wrong password.'
      ],
      values: req.body
    });
    return;
  }

  if (user.isStudent == true) {
    res.redirect('student/')
  } else {
    res.redirect('school/create')
  }
};

module.exports.signup = function (req, res) {
  res.render('auth/signup');
};

module.exports.signupPost = function (req, res) {
  var userName = req.body.userName;
  var name = req.body.name;
  var password = req.body.password;
  var passwordConfirm = req.body.passwordConfirm;

  if (passwordConfirm != password) {
    res.render('auth/signup', {
      errors: [
        'Password confirm is difference Password!'
      ],
      value: req.body
    });
    return;
  }

  var user = {
    "userName": userName,
    "name": name,
    "password": md5(password),
    "isStudent": true,
    "address": "",
    "privateKey": "",
    "transactionIdList": [],
    "classIdList": []
  }


  //get_user()
  async function getUser(address, userName) {
    try {
      var _user = await contract.methods.getUser(userName).call({ "from": address }, function (err, result) {
        console.log(result);
      })
      if (_user[0] == '') {
        return user = {};
      }
      return user = {
        "userName": userName,
        "name": _user[1],
        "password": _user[2],
        "isStudent": _user[3],
        "address": _user[4],
        "privateKey": _user[5],
        "transactionIdList": _user[6],
        "classIdList": _user[7]
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  if (!user) {  //neu chua ton tai username
    async function createAccount() {  //tao address cho tai khoan
      newAccount = web3.eth.accounts.create()
      return newAccount.address, newAccount.privateKey
    }
    var user = {
      "userName": userName,
      "name": name,
      "password": md5(password),
      "isStudent": true,
      "ad	dress": newAccount.address,
      "privateKey": newAccount.privateKey,
      "transactionIdList": [],
      "classIdList": []
    }

    async function createUser(address, user) {   //tao user moi
      var tx = contract.methods.createUser(user.userName, user.name, user.password, user.isStudent, user.address, user.privateKey).send({
        "from": account.address,
        "nonce": web3.getTransactionCount(account.address),
        "gas": gas,
        "gasPrice": web3.eth.gasPrice * 3
      }).on('receipt', function(receipt) {
        console.log(receipt);
      })

      var signed = web3.eth.accounts.signTransaction(tx, account.privateKey).then(console.log);
      var tx_hash = web3.eth.accounts.hashMessage(signed.rawTransaction);
      return tx_hash;
    }
    res.redirect('/login');
  }
}