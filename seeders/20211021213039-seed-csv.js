'use strict';
const path = require("path")
const relative_csv_url = path.join(process.cwd(), "/greenhouse_gas_inventory_data_data.csv")
const {to_Json} = require(path.join(process.cwd(), "/helper/csvtojson"));


module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		*/
		const json_data = await to_Json(relative_csv_url)
		return await queryInterface.bulkInsert('MyKaggle', json_data, {
			validation: true,
			individualHooks: true
		});
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('MyKaggle', null, {})
	}
};
