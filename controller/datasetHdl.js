const MyKaggle = require("../models").MyKaggle
const {Op, Sequelize} = require("sequelize")

const {isValidYear, validTags} = require("../helper/checks")

exports.CountriesRouteHdl = async (req, res, next) => {
	try {
		const returnRes = await MyKaggle.findAll({
			attributes: [
				'id',
				'country_or_area',
				[Sequelize.fn('min', Sequelize.col('year')), 'start_year'],
				[Sequelize.fn('max', Sequelize.col('year')), 'end_year'],
				'category'
			],
			group: ['country_or_area', 'tag']
		})
		return res.status(200).json({data: returnRes, status: 200})
	}
	catch (err) {
		return res.status(500).json({error: "Internal Server Error"})
	}
}

exports.TemporalQueryRouteHdl = async (req, res, next) => {
	const {start_year, end_year, tags} = req.query
	const {countryName} = req.params

	let cleanedTags = validTags(tags)
	// appr checks for validation of params and query values
	const where_clause = {
		country_or_area: {
			[Op.eq]: countryName
		},
		[Op.and]: [
			{
				country_or_area: countryName
			}, {
				year: {
					[Op.between]: [parseInt(start_year), parseInt(end_year)]
				}
			}
		]
	}
	// addding property of "tag" if cleanedTags are not empty
	// and have valid value otherwise db result run without tags value
	if (cleanedTags.length > 0) {
		where_clause[Op.and] = {...where_clause, tag: cleanedTags}
	}
	try {

		const returnData = await MyKaggle.findAll({
			attributes: [
				'id',
				'country_or_area',
				'value',
				'category',
				'year',
			],
			where: where_clause
		})
		return res.status(200).json({data: returnData, status: 200})
	}
	catch (err) {
		return res.status(500).json({error: "Internal Server Error"})
		throw new Error(err)
	}
}
