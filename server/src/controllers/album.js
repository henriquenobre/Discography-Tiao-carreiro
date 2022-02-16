const Album = require('../models/Album')
const jwt = require("jsonwebtoken");

const index = async (req, res, next) => {
  try {
    const users = await Album.findAll()

    //REMOVE password_hash FROM OBJECT
    const usersToRes = users.map(e => {
      let obj = e.dataValues
      delete obj.password_hash
      return obj
    })

    return res.status(200).json(usersToRes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let user = await Album.findByPk(id);

    if (!user) {
      return res.status(400).json({ error: "User does not exist." });
    }

    delete Album.dataValues.password_hash

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const create = async (req, res, next) => {
  try {
    const userExists = await Album.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: "User already exists." });
    }

    let createdUser = await Album.create(req.body);

    delete createdAlbum.dataValues.password_hash

    return res.status(200).json(createdUser);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userExists = await Album.findByPk(id);

    if (!userExists) {
      return res.status(400).json({ error: "User does not exist." });
    }

    let updatedUser = await Album.update(req.body, { where: { id } });

    delete updatedAlbum.dataValues.password_hash

    return res.status(200).json(updatedUser);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userExists = await Album.findByPk(id);

    if (!userExists) {
      return res.status(400).json({ error: "User does not exist." });
    }

    const deletedRes = await Album.destroy({ where: { id } });


    return res.status(200).json(deletedRes);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await Album.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: "User not found." });
    }

    if (!(await Album.checkPassword(password))) {
      return res.status(401).json({ error: "Password does not match!" });
    }

    const expiration = 60 * 60 * 24 * 1; // 1 dia

    const token = jwt.sign({ id: Album.id }, process.env.SECRET, {
      expiresIn: expiration
    });

    Album.dataValues.token = token;
    Album.dataValues.expiration = expiration;

    delete Album.dataValues.password_hash

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  index,
  login,
  create,
  update,
  remove,
  getById
};
