module.exports.classManager = function (req, res) {
  res.render('school/classmanager');  //middleware check isStudent = false
}

module.exports.createClass = function (req, res) {
  res.render('school/createclass');
}

module.exports.postCreateClass = function (req, res) {
  var classId = req.body.classId;
  var subjectId = req.body.subjectId;
  var subject = req.body.subject;
  var weigth = req.body.weigth;

  //get class
  async function getClass(classId) {
    try {
      var _class = await Payment.functions.getClass(classId).call({ "from": account.address })
      if (_class[0] == '') {
        return none;
      }
      return clasz = {
        "classId": classId,
        "subjectId": _class[1],
        "subject": _class[2],
        "weigth": _class[3]
      }
    } catch (error) {
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
    async function createClass(clasz) {   //tao user moi
      account = w3.eth.account.from_key(user.privateKey);
      tx = contract.functions.createClass(clasz.classId, clasz.subjectId, clasz.subject, clasz.weigth).buildTransaction({
        "from": account.address,
        "nonce": web3.getTransactionCount(account.address)
      })

      signed = web3.eth.account.signTransaction(tx, privateKey).then(console.log);
      tx_hash = web3.eth.accounts.hashMessage(signed.rawTransaction);
      return tx_hash.hex();
    }
    res.redirect('/createclass');
  }
}

module.exports.editClass = function (req, res) {
  res.render('school/editclass');
}

module.exports.postEditClass = function (req, res) {
  //post edit class
}