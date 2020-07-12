var md5 = require('md5');
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');

module.exports.login = function(req, res) {
    res.render('auth/login');
};

module.exports.postLogin = function(req, res) {
    var userName = req.body.inputUserName;
    var password = req.body.inputPassword;
    var rememberMe = req.body.rememberMe;
  
    //get_user()
    async function getUser(userName){
      try {
        var _user = await Payment.functions.getUser(userName).call({"from": account.address})
        if (_user[0] == '') {
          return none;
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
      } catch(error) {
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
  
    res.redirect('/student');
};

module.exports.signup = function(req, res) {
  res.render('auth/signup');
};

module.exports.signupPost = function(req,res) {
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

  //get_user()
  async function getUser(userName){
    try {
      var _user = await Payment.functions.getUser(userName).call({"from": account.address})
      if (_user[0] == '') {
        return none;
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
    } catch(error) {
      console.log(error);
    }
  }

  if (!user) {  //neu chua ton tai username
    async function createAccount() {  //tao address cho tai khoan
      newAccount = web3.eth.account.create()
      return newAccount.address, newAccount.privateKey
    }
    user = {
      "userName": userName,
      "name": name,
      "password": md5(password),
      "isStudent": true,
      "address": newAccount.address,
      "publicKey": '',
      "privateKey": newAccount.privateKey
    }

    async function createUser(user) {   //tao user moi
      account = w3.eth.account.from_key(user.privateKey);
      tx = contract.functions.createUser(user.userName, user.name, user.password, user.isStudent, user.address, user.publicKey, user.privateKey).buildTransaction({
        "from": account.address,
        "nonce": web3.getTransactionCount(account.address)
      })

      signed = web3.eth.account.signTransaction(tx, privateKey).then(console.log);
      tx_hash = web3.eth.accounts.hashMessage(signed.rawTransaction);
      return tx_hash.hex();
    }
    res.redirect('/');
  }
}