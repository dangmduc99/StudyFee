const { text } = require("body-parser");
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:3030'));
var Contract = require('web3-eth-contract');
Contract.setProvider('ws://localhost:3030');

var addr = "0x8d7f37F2a22492c8281DdA4861907B1CFd183C6C";
var privateKey = "0xcda2ce690f1d1c8a1e67b9819224fc38c6568f6d147f339bbdd7fbcfa261ea5b";
var server = '5a783e4645115f6986d19a395084f1970ac511f4';
var address = '29b3ae355818d8bc2512da8829879750f14fb938';
var transactionid = 'dcc12c1030d0288b74819ad79ce445354481d1e6bf685d88aed60c3f4260f5d747d53c5c6c3312f2396a5d55b4cf83669bb5114a46f9574fca33f07f716e4251';

var jsonInterface = [
    {
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "userName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_amount",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_transactionId",
				"type": "string"
			}
		],
		"name": "transaction",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
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
		"name": "transactions",
		"outputs": [
			{
				"internalType": "string",
				"name": "transactionId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "amount",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "userName",
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
			}
		],
		"name": "updateUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "userName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_classId",
				"type": "string"
			}
		],
		"name": "registerClass",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
var contract = new Contract(jsonInterface, address);
var Accounts = require('web3-eth-accounts');
var accounts = new Accounts('ws://localhost:3030');

module.exports.profile = function(req, res) {
    res.render('student/home');
}

module.exports.postProfile = function(req, res) {
    //get current user
}

module.exports.updateProfile = function(req, res) {
    res.render('student/updateprofile');
}

module.exports.postUpdateProfile = function (req, res) {
    var newName = req.body.name;
    var newPassword = req.body.password;
    var cfPassword = req.body.cfpass;

    if (cfPassword != newPassword) {
        res.render('auth/signup', {
          errors: [
            'Password confirm is difference Password!'
          ],
          value: req.body
        });
        return;
    }

    async function updateUser(userName, privateKey, newName, newPassword) {
        var account = w3.eth.account.privateKeyToAccount(privateKey);
        var tx = contract.methods.updateUser(userName, newName, newPassword).send({
            "from": account.address,
            "nonce": web3.getTransactionCount(account.address),
            "gas": gas,
            "gasPrice": web3.eth.gasPrice * 3
        });

        var signed = web3.eth.account.signTransaction(tx, privateKey).then(console.log);
        var tx_hash = web3.eth.accounts.hashMessage(signed.rawTransaction);
        return tx_hash;
    }
    res.redirect('student/home')
}

module.exports.registerClass = function (req, res) {
    res.render('student/registerclass');
}


module.exports.postRegisterClass = function (req, res) {
    var classId = req.body.classId;

    async function register(privateKey, userName, classId) {
        account = web3.eth.accounts.privateKeyToAccount(privateKey);
        tx = contract.functions.registerClass(userName, classId).send({
            "from": account.address,
            "nonce": web3.getTransactionCount(account.address),
            "gas": gas,
            "gasPrice": web3.eth.gasPrice * 3
        });
        var signed = web3.eth.account.signTransaction(tx, privateKey).then(console.log);
        var tx_hash = web3.eth.accounts.hashMessage(signed.rawTransaction);
        return tx_hash;
    }
    res.render('student/registerclass');
}

module.exports.studyFee = function (req, res) {
	res.render('student/studyfee');
}