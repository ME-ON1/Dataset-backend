
exports.isYearValid = (year) => {
	// check if year is number , whole number and inclusive of 1990 to 2014
	if (year === null || year === undefined) {
		return false;
	}
	let potential_year = parseInt(year)

	if (isNaN(potential_year) || potential_year % 1 != 0 || potential_year > 2015 && potential_year < 1990) {
		return false;
	}

	return true;
}

exports.createValidTags = (tags) => {
	let cleanedTagArr = []
	if (tags === undefined || tags === null) {
		return cleanedTagArr
	}
	let tagArr = tags.split(",")
	for (let tagToken of tagArr) {
		if (tagToken !== undefined && tagToken.length !== 0 && isNaN(tagToken)) {
			cleanedTagArr.push(tagToken.toUpperCase())
		}
	}
	return cleanedTagArr
}

exports.isParamValid = (countryName) => {
	if (countryName === undefined || countryName == null) {
		return false;
	}

	if (countryName.length > 0) {
		return true
	}

	return false;
}
