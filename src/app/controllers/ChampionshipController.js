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

    const teamsData = await Team.findAll({ where: { id: teams } });
    let dontUse = false;
    await teamsData.forEach(team => {
      if (team.user_id !== req.userId) {
        dontUse = true;
      }
    });

    if (dontUse) {
      return res.status(401).json({
        message: 'You dont have permission to use one or more teams',
      });
    }

    const championshipExists = await Championship.findOne({ where: { title } });

    if (championshipExists) {
      return res.status(400).json({ message: 'Championship alreandy exists' });
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
      championship.id,
      teamsData
    );

    return res.json({
      message: 'Sucess to create championship',
      championship,
      games,
      rankings,
    });
  }

  async createGames(teams, championshipId) {
    const games = [];

    teams.forEach(teamOne => {
      teams.forEach(teamTwo => {
        if (teamOne !== teamTwo) {
          const game = {
            championship_id: championshipId,
            first_team_id: teamOne,
            second_team_id: teamTwo,
          };
          games.push(game);
        }
      });
    });

    await games.forEach(async game => {
      await Games.create(game);
    });

    return games;
  }

  async setInitialRanking(championshipId, teamWithAllData) {
    const ranks = [];

    teamWithAllData.sort((x, y) => {
      if (x.name < y.name) {
        return -1;
      }
      if (x.name > y.name) {
        return 1;
      }
      return 0;
    });

    let classification = 0;
    teamWithAllData.forEach(team => {
      classification += 1;
      const rank = {
        team_id: team.id,
        championship_id: championshipId,
        position: classification,
      };
      ranks.push(rank);
    });

    await ranks.forEach(async rank => {
      await Raking.create(rank);
    });

    return ranks;
  }
}

export default new ChampionshipController();
