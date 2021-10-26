const {isYearValid, createValidTags, isParamValid} = require("../helper/checks")

exports.sanitize = (req, res, next) => {
	const {start_year, end_year, tags} = req.query
	const {countryName} = req.params

	req.query.tags = createValidTags(tags)
	if (isYearValid(start_year) && isYearValid(end_year) && isParamValid(countryName)) {
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

		return res.status(500).json({error: "query and params arent valid values", status: 500, possible_error_var: errorVars})
	}
}
