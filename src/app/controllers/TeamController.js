import Team from '../models/Team';

class TeamController {
  store(req, res) {
    const { teams } = req.body;

    let result;

    teams.forEach(async team => {
      const teamExists = await Team.findOne({ where: { name: team.name } });
      if (teamExists) {
        result.push(teamExists);
      } else {
        const teamCreated = await Team.create({ ...team, user_id: req.userId });
        result.push(teamCreated);
      }
    });

    return res.json(result);
  }

  async get(req, res) {
    const teams = await Team.findAll({ where: { user_id: req.userId } });

    return res.json({ teams });
  }

  async getByName(req, res) {
    const { name } = req.query;
    const team = await Team.findAll({ where: { name, user_id: req.userId } });

    return res.json({ team });
  }

  async update(req, res) {
    const { name, id } = req.body;

    const teamToUpdate = await Team.findByPk(id);

    if (teamToUpdate) {
      if (teamToUpdate.user_id !== req.userId) {
        return res
          .status(401)
          .json({ message: 'Permission denied to update this register' });
      }
      const result = await teamToUpdate.update({ name });

      return res.json(result);
    }

    return res.status(400).json({ error: 'Team does not exists' });
  }

  async delete(req, res) {
    const { id } = req.body;

    const teamToDelete = await Team.findByPk(id);

    if (teamToDelete) {
      if (teamToDelete.user_id !== req.userId) {
        return res
          .status(401)
          .json({ message: 'Permission denied to delete this register' });
      }

      await teamToDelete.destroy({ id });

      return res.json({ message: 'Sucess to delete team' });
    }

    return res.status(400).json({ error: 'Team does not exists' });
  }
}

export default new TeamController();
