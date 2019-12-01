import Championship from '../models/Championship';
import Team from '../models/Team';
import Games from '../models/Games';
import Raking from '../models/Ranking';

class ChampionshipController {
  async store(req, res) {
    const { title, teams } = req.body;

    const championshipExists = await Championship.findOne({ where: { title } });

    if (championshipExists) {
      return res.status(400).json({ error: 'Championship alreandy exists' });
    }

    const championship = await Championship.create({
      title,
      user_id: req.userId,
    });

    const games = await this.createGames(teams, championship.id);

    if (games === null) {
      return res.status(401).json({
        message: 'You dont have permission to use one or more teams',
      });
    }

    const rankings = await this.setInitialRanking(teams, championship.id);

    return res.json({
      message: 'Sucess to create championship',
      championship,
      games,
      rankings,
    });
  }

  async createGames(teams, championshipId, userId) {
    let dontUse;
    await teams.array.forEach(async team => {
      const checkTeam = await Team.findByPk(team);
      if (checkTeam.user_id !== userId) {
        dontUse = true;
      }
    });

    if (dontUse) {
      return null;
    }
    let games;

    await teams.forEach(async teamOne => {
      await teams.forEach(async teamTwo => {
        if (teamOne !== teamTwo) {
          const game = await Games.create({
            championship_id: championshipId,
            first_team_id: teamOne,
            second_team_id: teamTwo,
          });
          games.push(game);
        }
      });
    });

    return games;
  }

  async setInitialRanking(teams, championshipId) {
    let names;
    let teamsWithAllData;
    let ranks;

    await teams.forEach(async team => {
      const teamWithAllData = await Team.findByPk(team);
      names.push(teamWithAllData.name);
      teamsWithAllData.push(teamWithAllData);
    });
    const alphabeticalOrder = names.sort();

    let classification = 1;
    await alphabeticalOrder.map(async name => {
      await teamsWithAllData.map(async team => {
        if (team.name === name) {
          const rank = await Raking.create({
            team_id: team.id,
            championship_id: championshipId,
            position: classification,
          });
          classification += 1;
          ranks.push(rank);
        }
      });
    });

    return ranks;
  }
}

export default new ChampionshipController();
