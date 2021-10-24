'use strict';

const {DataTypes, Model} = require("sequelize");
const {CTRY_MAP} = require("../helper/constVal")

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('MyKaggle', {
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false
			},
			country_or_area: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: false
			},
			year: {
				type: DataTypes.INTEGER,
				allowNull: false,
				unique: false
			},
			value: {
				type: DataTypes.DOUBLE,
				allowNull: false,
				unique: false
			},
			category: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: false
			},
			tag: {
				type: DataTypes.STRING,
				allowNull: true// for creating hooks
			},
		},
			{
				hooks: {
					beforeBulkCreate: (datasets, options) => {
						//for (dataset of datasets) {
						//dataset.tag = CTRY_MAP[dataset.category]
						//}
						console.log("emitted before")
					}
				},
			}
		)
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('MyKaggle');
	}
};
