const Sequelize = require("sequelize");
const { Model } = require("sequelize");


class Album extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
                ano: Sequelize.INTEGER,
            },
            {
                sequelize,
                timestamps: false,
                createdAt: false,
                updatedAt: false,
                tableName: "album"
            }
        );

        return this;
    }
    static associate(models) {
        this.hasMany(models.Faixa, { as: "faixa" })
    }
}

module.exports = Album;