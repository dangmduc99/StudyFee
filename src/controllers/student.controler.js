const { text } = require("body-parser");

module.exports.profile = function(req, res) {
    res.render('student/home');
}

module.exports.postProfile = function(req, res) {
    //get current user
}

module.exports.updateProfile = function(req, res) {
    res.render('student/home');
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
        account = web3.eth.account.from_key(privateKey);
        tx = contract.functions.updateUser(userName, name, newPassword).buildTransaction({
            "from": account.address,
            "nonce": web3.getTransactionCount(account.address)
        });

        signed = web3.eth.account.signTransaction(tx, privateKey).then(console.log);
        tx_hash = web3.eth.accounts.hashMessage(signed.rawTransaction);
        return tx_hash.hex();
    }
}

module.exports.registerClass = function (req, res) {
    res.render('student/registerclass');
}

module.exports.getClass = function(req, res) {
    var classId = req.body.classId;

    async function getClass(privateKey, classId) {
        account = web3.eth.account.from_key(privateKey);
        try {
            _class = Payment.functions.getClass(classId).call({"from": account.address})
            if (_class[0] == '') {
                return none;
            }
            return {
                //class information
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    res.render('/student/registerclass');
}

module.exports.postRegisterClass = function (req, res) {
    //register
}

module.exports.studyFee = function (req, res) {
    //study fee
}

module.exports.postStudyFee = function (req, res) {
    var schoolYear = req.body.schoolYear;

    async function getStudyFee(privateKey, userName, schoolYear) {
        account =web3.eth.account.from_key(privateKey);
        try {
            _studyfee = Payment.functions.getStudyFee(userName, schoolYear).call({"from": account.address})
            if (_studyfee[0] == '' || _studyfee[1] == '') {
                return none;
            }
            return {
                //study fee information
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    res.render('/student/studyfee');
}