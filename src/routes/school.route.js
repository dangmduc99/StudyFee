var express = require ('express');

var controller = require ('../controllers/school.controller');

var router = express.Router();

router.get('/create', controller.createClass);

router.post('/create', controller.postCreateClass);

router.get('/edit', controller.editClass);

router.post('/edit', controller.postEditClass);