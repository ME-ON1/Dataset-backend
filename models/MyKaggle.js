'use strict';
const {
	Model, Sequelize
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
	class MyKaggle extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	};
	MyKaggle.init({
		id: {
			type: Sequelize.UUID,
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
			allowNull: true // for creating hooks
		},
	},
		{
			hooks: {
				beforeBulkCreate: (datasets, options) => {
					/*for (dataset of datasets) {
					       console.log("sds")
					       dataset.tag = CTRY_MAP[dataset.category]
				       }*/
					console.log("emitter before eent ")
				}
			},
			sequelize,
			modelName: 'MyKaggle',
			timestamps: false,
			freezeTableName: true,
			tableName: 'MyKaggle'
		});
	return MyKaggle;
};
