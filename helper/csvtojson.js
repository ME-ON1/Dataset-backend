const fs = require("fs")
const path = require("path")
const {promisify} = require("util")
const {CTRY_MAP} = require("./constVal")
const uuid = require("uuid")

// promisifys read and write file
const readPromise = promisify(fs.readFile)
const writePromise = promisify(fs.watchFile)



const error_arr = [null, undefined]

// read csv and convert to json
// return records to seed in table
exports.to_Json = async (csv_url) => {
	try {
		const csv_data = await readPromise(csv_url, "utf8")

		const lines = csv_data.split('\n')
		const json_data = []
		const headers = lines[0].split(',')

		lines.map(l => {
			const obj = {}
			const line = l.split(',')
			if (line[0].length !== 0) {
				headers.map((h, i) => {
					obj[h] = line[i]
					obj["id"] = uuid.v4()
					// insert "tag" field schema match
					if (i === line.length - 1) {
						obj["tag"] = CTRY_MAP[line[i]]
					}
				})
				json_data.push(obj)
			}
		})
		// clear first element
		// which is column values
		json_data.shift()
		return json_data
	} catch (err) {
		throw new Error("Something happened while converting csv to json seed" + err)
	}
}
