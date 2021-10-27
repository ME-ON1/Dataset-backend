var express = require('express');
var router = express.Router();


var controllers = require("../controller")
var {sanitize} = require("../middlewares/sanitize")

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: 'Express'});
});

router.get("/countries", controllers.CountriesRouteHdl)
router.get("/country/:countryName?", sanitize, controllers.TemporalQueryRouteHdl)

// router.get("/openapi", swaggerUi.serve, swaggerUi.setup(specs))

module.exports = router;
