const Faixa = require('../models/Faixa')

const index = async (req, res, next) => {
  try {
    const dbRes = await Faixa.findAll()

    return res.status(200).json(dbRes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const dbRes = await Faixa.findByPk(id);

    if (!dbRes) {
      return res.status(400).json({ error: "Register does not exist." });
    }

    return res.status(200).json(dbRes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const create = async (req, res, next) => {
  try {
    const dbRes = await Faixa.create(req.body);

    return res.status(200).json(dbRes);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const dbRes = await Faixa.update(req.body, { where: { id } });

    return res.status(200).json(dbRes);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userExists = await Faixa.findByPk(id);

    if (!userExists) {
      return res.status(400).json({ error: "Register does not exist." });
    }

    const dbRes = await Faixa.destroy({ where: { id } });

    return res.status(200).json(dbRes);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  index,
  create,
  update,
  remove,
  getById
};
