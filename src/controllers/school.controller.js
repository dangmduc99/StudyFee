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
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "classId",
				"type": "string"
			}
		],
		"name": "getClass",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "classId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "subjectId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "subject",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "weight",
						"type": "string"
					}
				],
				"internalType": "struct Manager.Class",
				"name": "",
				"type": "tuple"
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
				"name": "_classId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_subjectId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_subject",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_weight",
				"type": "string"
			}
		],
		"name": "createClass",
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
				"name": "classId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_subjectId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_subject",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_weight",
				"type": "string"
			}
		],
		"name": "editClass",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
var contract = new Contract(jsonInterface, address);
var Accounts = require('web3-eth-accounts');
var accounts = new Accounts('ws://localhost:3030');

module.exports.createClass = function (req, res) {
	res.render('school/createclass');
}

module.exports.postCreateClass = function (req, res) {
	var classId = req.body.classId;
	var subjectId = req.body.subjectId;
	var subject = req.body.subject;
	var weigth = req.body.weigth;


	var clasz = {
		"classId": classId,
		"subjectId": subjectId,
		"subject": subject,
		"weight": weight
	}

	//get class
	async function getClass(classId) {
		try {
			var _class = await contract.methods.getClass(classId).call({ "from": address });
			if (_class[0] == '') {
				return clasz = {};
			}
			return clasz = {
				"classId": classId,
				"subjectId": _class[1],
				"subject": _class[2],
				"weigth": _class[3]
			}
		}
		catch (error) {
			console.log(error);
		}
	}

	if (!clasz) { //chua co ma lop

		clasz = {
			"classId": classId,
			"subjectId": subjectId,
			"subject": subject,
			"weigth": weigth
		}
		async function createClass(privateKey, clasz) {   //tao class moi
			var account = w3.eth.accounts.privateKeyToAccount(privateKey);
			var tx = contract.methods.createClass(clasz.classId, clasz.subjectId, clasz.subject, clasz.weigth).send({
				"from": account.address,
				"nonce": web3.getTransactionCount(account.address),
				"gas": gas,
				"gasPrice": web3.eth.gasPrice * 3
			})

			var signed = web3.eth.account.signTransaction(tx, privateKey).then(console.log);
			var tx_hash = web3.eth.accounts.hashMessage(signed.rawTransaction);
			return tx_hash;
		}
		res.redirect('/createclass');
	}
}

module.exports.editClass = function (req, res) {
	res.render('school/editclass');
}

module.exports.postEditClass = function (req, res) {
	var classId = req.body.classId;
	var subjectId = req.body.subjectId;
	var subject = req.body.subject;
	var weigth = req.body.weigth;


	var clasz = {
		"classId": classId,
		"subjectId": subjectId,
		"subject": subject,
		"weight": weight
	}


	async function createClass(privateKey, clasz) {   //tao class moi
		var account = w3.eth.accounts.privateKeyToAccount(privateKey);
		var tx = contract.methods.editClass(clasz.classId, clasz.subjectId, clasz.subject, clasz.weigth).send({
			"from": account.address,
			"nonce": web3.getTransactionCount(account.address),
			"gas": gas,
			"gasPrice": web3.eth.gasPrice * 3
		})

		var signed = web3.eth.account.signTransaction(tx, privateKey).then(console.log);
		var tx_hash = web3.eth.accounts.hashMessage(signed.rawTransaction);
		return tx_hash;
	}
	
	res.redirect('/createclass');
}