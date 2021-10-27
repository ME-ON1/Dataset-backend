const MyKaggle = require("../models").MyKaggle
const {Op, Sequelize} = require("sequelize")
const client = require("./caching")

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
		console.error(err)
		return res.status(500).json({error: "Internal Server Error"})
	}
}

exports.TemporalQueryRouteHdl = async (req, res, next) => {
	const {start_year, end_year, tags} = req.query
	const {countryName} = req.params

	const cache_key = `${start_year}:${end_year}:${countryName}:${tags}`

	// appr checks for validation of params and query values
	const where_clause = {
		[Op.and]: [
			{
				country_or_area: Sequelize.where(Sequelize.fn('upper', Sequelize.col('country_or_area')),
					Sequelize.fn('upper', countryName))
			}, {
				year: {
					[Op.between]: [parseInt(start_year), parseInt(end_year)]
				}
			}
		]
	}
	// addding property of "tag" if cleanedTags are not empty
	// and have valid value otherwise db result run without tags value
	// => had to explicity convert to array sequelize converting it into string
	if (tags.length > 0) {
		where_clause[Op.and] = {
			...where_clause,
			tag: Sequelize.where(Sequelize.fn("upper", Sequelize.col("tag")), Op.in, new Array(tags))
		}
		try {
			client.get(cache_key, async (err, data) => {
				if (err) {
					console.log(err, "Getting error in reteriving data from cache");
				}

				if (data) {
					return res.status(200).json({data: JSON.parse(data), status: 200})
				}
				else {
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
					// copy to store json string and send right value to user
					const shallow_copy_return_data = returnData
					client.setex(cache_key, 1000, JSON.stringify(shallow_copy_return_data))
					return res.status(200).json({data: returnData, status: 200})
				}
			})
		}
		catch (err) {
			console.error(err)
			return res.status(500).json({error: "Internal Server Error"})
		}
	}
}
