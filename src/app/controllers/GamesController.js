import Games from '../models/Games';
import Ranking from '../models/Ranking';
import Team from '../models/Team';
import Championship from '../models/Championship';

class GamesController {
  async index(req, res) {
    const { championshipId } = req.query;
    const games = await Games.findAll({
      where: {
        championship_id: championshipId,
      },
      include: [
        {
          model: Team,
          as: 'first_team',
          attributes: ['name', 'id'],
        },
        {
          model: Team,
          as: 'second_team',
          attributes: ['name', 'id'],
        },
      ],
    });

    return res.json({ games });
  }

  async update(req, res) {
    const {
      gameId,
      firstTeamGoals,
      secondTeamGoals,
      firstTeamProGoals,
      secondTeamProGoals,
    } = req.body;

    const gameToUpdate = await Games.findByPk(gameId);

    if (gameToUpdate.complete) {
      return res.status(401).json({ message: 'The game is alreandy complete' });
    }

    await gameToUpdate.update({
      first_team_goals: firstTeamGoals,
      second_team_goals: secondTeamGoals,
      complete: true,
    });

    const gamesController = new GamesController();

    const updateRanking = await gamesController.updateRankingData(
      gameToUpdate,
      firstTeamGoals,
      secondTeamGoals,
      firstTeamProGoals,
      secondTeamProGoals
    );

    if (!updateRanking) {
      return res.status(500).json({ message: 'Error to update ranking' });
    }

    const result = gamesController.checkAndAjustRankAfterUpdate(
      gameToUpdate.championship_id
    );

    if (!result) {
      return res.status(500).json({ message: 'Error to update ranking' });
    }

    await gamesController.checkGamesAndUpdateChampionship(
      gameToUpdate.championship_id
    );

    return res.json({ message: 'Sucess to update Game and ranking' });
  }

  async updateRankingData(
    game,
    firstTeamGoals,
    secondTeamGoals,
    firstTeamProGoals,
    secondTeamProGoals
  ) {
    const firstTeamRank = await Ranking.findOne({
      where: {
        team_id: game.first_team_id,
      },
    });

    const secondTeamRank = await Ranking.findOne({
      where: {
        team_id: game.second_team_id,
      },
    });

    let firstTeam;
    let secondTeam;

    const newFirstTeamProGoals = firstTeamProGoals + firstTeamRank.pro_goals;
    const newFirstTeamGoals = firstTeamGoals + firstTeamRank.goals;
    const newSecondTeamGoals = secondTeamProGoals + secondTeamRank.goals;
    const newSecondTeamProGoals = secondTeamProGoals + secondTeamRank.pro_goals;

    if (firstTeamGoals > secondTeamGoals) {
      const points = firstTeamRank.points + 3;
      const victories = firstTeamRank.victories + 1;

      firstTeam = await firstTeamRank.update({
        points,
        victories,
        pro_goals: newFirstTeamProGoals,
        goals: newFirstTeamGoals,
      });

      secondTeam = await secondTeamRank.update({
        pro_goals: newSecondTeamGoals,
        goals: newSecondTeamProGoals,
      });
    } else if (firstTeamGoals < secondTeamGoals) {
      const points = secondTeamRank.points + 3;
      const victories = secondTeamRank.victories + 1;
      secondTeam = await secondTeamRank.update({
        points,
        victories,
        pro_goals: secondTeamRank.points,
        goals: newSecondTeamProGoals,
      });

      firstTeam = await firstTeamRank.update({
        pro_goals: newFirstTeamProGoals,
        goals: newFirstTeamGoals,
      });
    } else {
      let points = secondTeamRank.points + 1;
      secondTeam = await secondTeamRank.update({
        points,
        pro_goals: newSecondTeamGoals,
        goals: newSecondTeamProGoals,
      });

      points = firstTeamRank.points + 1;

      firstTeam = await firstTeamRank.update({
        points,
        pro_goals: newFirstTeamProGoals,
        goals: newFirstTeamGoals,
      });
    }

    return !!(secondTeam && firstTeam);
  }

  async checkAndAjustRankAfterUpdate(championship_id) {
    const ranking = await Ranking.findAll({
      where: { championship_id },
      include: [
        {
          model: Team,
          as: 'team',
          attributes: ['name', 'id'],
        },
      ],
    });

    ranking.sort((x, y) => {
      if (x.points > y.points) {
        return -1;
      }
      if (x.points < y.points) {
        return 1;
      }
      if (x.victories > y.victories) {
        return -1;
      }
      if (x.victories < y.victories) {
        return 1;
      }
      if (x.goals > y.goals) {
        return -1;
      }
      if (x.goals < y.goals) {
        return 1;
      }
      if (x.team.name > y.team.name) {
        return -1;
      }
      if (x.team.name < y.team.name) {
        return 1;
      }
      return 0;
    });

    let newRank = 0;
    await ranking.forEach(async item => {
      newRank += 1;
      await Ranking.update({ position: newRank }, { where: { id: item.id } });
    });

    return true;
  }

  async checkGamesAndUpdateChampionship(championshipId) {
    const games = await Games.findAll({
      where: { championship_id: championshipId },
    });

    let status = true;

    games.forEach(game => {
      if (game.complete === false) {
        status = false;
      }
    });

    if (status) {
      await Championship.update(
        { complete: status },
        { where: { id: championshipId } }
      );
    }
  }
}

export default new GamesController();
