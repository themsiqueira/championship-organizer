import Championship from '../models/Championship';
import Team from '../models/Team';
import Games from '../models/Games';
import Raking from '../models/Ranking';

class ChampionshipController {
  async index(req, res) {
    const championships = await Championship.findAll({
      where: { user_id: req.userId },
    });

    if (championships) {
      return res.json({
        message: 'Sucess to find championships',
        championships,
      });
    }

    return res.json({
      message: 'Not found any championship',
    });
  }

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

    const championshipController = new ChampionshipController();

    const games = await championshipController.createGames(
      teams,
      championship.id,
      req.userId
    );

    if (games === null) {
      return res.status(401).json({
        message: 'You dont have permission to use one or more teams',
      });
    }

    const rankings = await championshipController.setInitialRanking(
      teams,
      championship.id
    );

    return res.json({
      message: 'Sucess to create championship',
      championship,
      games,
      rankings,
    });
  }

  async createGames(teams, championshipId, userId) {
    let dontUse;
    const promises = teams.map(async team => {
      const checkTeam = await Team.findByPk(team);
      if (checkTeam.user_id !== userId) {
        dontUse = true;
      }
    });

    await Promise.all(promises);

    if (dontUse) {
      return null;
    }

    const games = [];

    teams.map(teamOne => {
      teams.map(teamTwo => {
        if (teamOne !== teamTwo) {
          const game = {
            championship_id: championshipId,
            first_team_id: teamOne,
            second_team_id: teamTwo,
          };

          Games.create(game);
          games.push(game);
        }
      });
    });

    return games;
  }

  async setInitialRanking(teams, championshipId) {
    const names = [];
    const teamsWithAllData = [];
    const ranks = [];

    const promises = teams.map(async team => {
      const teamWithAllData = await Team.findByPk(team);
      names.push(teamWithAllData.name);
      teamsWithAllData.push(teamWithAllData);
    });

    await Promise.all(promises);

    const alphabeticalOrder = names.sort();

    let classification = 1;
    alphabeticalOrder.map(name => {
      teamsWithAllData.map(team => {
        if (team.name === name) {
          const rank = {
            team_id: team.id,
            championship_id: championshipId,
            position: classification,
          };
          Raking.create(rank);
          classification += 1;
          ranks.push(rank);
        }
      });
    });

    return ranks;
  }
}

export default new ChampionshipController();
