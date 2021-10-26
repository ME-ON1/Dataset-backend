const {isValidYear, validTags} = require("../helper/checks")

exports.sanitize = (req, res, next) => {
	const {start_year, end_year, tags} = req.query
	const {countryName} = req.params

	let cleanedTags = validTags(tags)
	if (isValidYear(start_year) && isValidYear(end_year) && countryName !== undefined && countryName.length > 0) {
		next();
	}
	else {
		let errorVars = []
		if (!isValidYear(start_year)) {
			errorVars.push("start_year")
		}
		if (!isValidYear(end_year)) {
			errorVars.push("end_year")
		}
		if (countryName === undefined || countryName === null || countryName.length === 0) {
			errorVars.push("countryName")
		}

		return res.status(500).json({error: "query and params arent valid values", status: 500, possible_error_var: errorVars})
	}
}
