const Sequelize = require("sequelize");
const { Model } = require("sequelize");


class Faixa extends Model {
    static init(sequelize) {
        super.init(
            {
                numero: Sequelize.INTEGER,
                nome: Sequelize.STRING,
                duracao: Sequelize.STRING,
                album_id: Sequelize.INTEGER,
            },
            {
                sequelize,
                timestamps: false,
                createdAt: false,
                updatedAt: false,
                tableName: "faixa"
            }
        );

        return this;
    }
    static associate(models) {
        this.belongsTo(models.Album, {
            foreignKey: "album_id",
            as: "album"
        })
    }
}

module.exports = Faixa;