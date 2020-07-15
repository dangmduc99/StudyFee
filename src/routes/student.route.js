var express = require ('express');

var controller = require ('../controllers/student.controler');

var router = express.Router();

router.get('/', controller.profile);

router.get('/update', controller.updateProfile)

router.post('/update', controller.postUpdateProfile);

router.get('/registerclass', controller.registerClass);

router.post('/registerclass', controller.postRegisterClass);

router.get('/studyfee', controller.studyFee);

// router.post('/studyfee', controller.postStudyFee);

module.exports = router;