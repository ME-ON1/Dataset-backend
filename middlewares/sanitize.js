const {isYearValid, createValidTags, isParamValid, whichVarNotPresent} = require("../helper/checks")

// for checking start_year, end_year and tags are valid
// query in middlewares
exports.sanitize = (req, res, next) => {
	const {start_year, end_year, tags} = req.query
	const {countryName} = req.params


	if (isYearValid(start_year) && isYearValid(end_year) && isParamValid(countryName) && tags !== undefined && tags !== null) {
		req.query.tags = createValidTags(tags)
		return next();
	}
	else {
		let errorVars = []
		if (!isYearValid(start_year)) {
			errorVars.push("start_year")
		}
		if (!isYearValid(end_year)) {
			errorVars.push("end_year")
		}
		if (!isParamValid(countryName)) {
			errorVars.push("countryName")
		}
		if (tags == undefined || tags == null) {
			errorVars.push("tags")
		}

		return res.status(500).json({error: "query and params arent valid values", status: 500, possible_error_var: errorVars})
	}
}
