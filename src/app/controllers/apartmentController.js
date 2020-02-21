const { Apartment } = require('../models');

class ApartmentController {
  async index(req, res) {
    try {
      const apartments = await User.findAll();
      return res.json(apartments);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async show(req, res) {
    try {
      const apartment = await User.findByPk(req.params.id);

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      const apartment = await Apartment.create(req.body);

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const apartment = await Apartment.findByPk(req.params.id);

      await apartment.update(req.body);

      return res.json({ apartment });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      const apartment = await Apartment.findByPk(req.params.id);

      await apartment.destroy();

      return res.json();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
module.exports = new ApartmentController();
