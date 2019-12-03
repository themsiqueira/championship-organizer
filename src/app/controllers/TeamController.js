import Team from '../models/Team';

class TeamController {
  async store(req, res) {
    const { teams } = req.body;

    const result = [];

    const promises = teams.map(async team => {
      const teamExists = await Team.findOne({ where: { name: team.name } });
      if (teamExists === null || teamExists === undefined) {
        const teamCreated = await Team.create({ ...team, user_id: req.userId });
        result.push(teamCreated);
      }
    });

    await Promise.all(promises);

    return res.json({ message: 'Sucess create new record', result });
  }

  async index(req, res) {
    const teams = await Team.findAll({ where: { user_id: req.userId } });

    if (!teams) {
      return res.json({ message: 'Nothing was found' });
    }

    return res.json({ message: 'Sucess to find teams', teams });
  }

  async indexByName(req, res) {
    const { name } = req.query;
    const team = await Team.findOne({ where: { name, user_id: req.userId } });

    if (!team) {
      return res.json({ message: 'Team not fount' });
    }

    return res.json({ message: 'Sucess to find team', team });
  }

  async update(req, res) {
    const { newName, id } = req.body;

    const teamToUpdate = await Team.findByPk(id);

    if (teamToUpdate) {
      if (teamToUpdate.user_id !== req.userId) {
        return res
          .status(401)
          .json({ message: 'Permission denied to update this register' });
      }
      const team = await teamToUpdate.update({ name: newName });

      return res.json({ message: 'Sucess to update team', team });
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

    return res.status(400).json({ message: 'Team does not exists' });
  }
}

export default new TeamController();
