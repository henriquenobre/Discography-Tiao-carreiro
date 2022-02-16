const Sequelize = require("sequelize");
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");


class Album extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                year: Sequelize.DATE
            },
            {
                sequelize,
                tableName: "album"
            }
        );

        return this;
    }
}

module.exports = Album;