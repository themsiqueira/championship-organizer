import Games from '../models/Games';
import Ranking from '../models/Ranking';
import Team from '../models/Team';

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

    const newFirstTeamProGoals = firstTeamProGoals + firstTeamRank.pro_goals;
    const newFirstTeamGoals = firstTeamGoals + firstTeamRank.goals;
    const newSecondTeamGoals = secondTeamProGoals + secondTeamRank.goals;
    const newSecondTeamProGoals = secondTeamProGoals + secondTeamRank.pro_goals;

    if (firstTeamGoals > secondTeamGoals) {
      const points = firstTeamRank.points + 3;
      const victories = firstTeamRank.victories + 1;

      await firstTeamRank.update({
        points,
        victories,
        pro_goals: newFirstTeamProGoals,
        goals: newFirstTeamGoals,
      });

      await secondTeamRank.update({
        pro_goals: newSecondTeamGoals,
        goals: newSecondTeamProGoals,
      });
    } else if (firstTeamGoals < secondTeamGoals) {
      const points = secondTeamRank.points + 3;
      const victories = secondTeamRank.victories + 1;
      await secondTeamRank.update({
        points,
        victories,
        pro_goals: secondTeamRank.points,
        goals: newSecondTeamProGoals,
      });

      await firstTeamRank.update({
        pro_goals: newFirstTeamProGoals,
        goals: newFirstTeamGoals,
      });
    } else {
      let points = secondTeamRank.points + 1;
      await secondTeamRank.update({
        points,
        pro_goals: newSecondTeamGoals,
        goals: newSecondTeamProGoals,
      });

      points = firstTeamRank.points + 1;

      await firstTeamRank.update({
        points,
        pro_goals: newFirstTeamProGoals,
        goals: newFirstTeamGoals,
      });
    }
    return true;
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

    const result = ranking.sort(function compararNumeros(a, b) {
      return a.points - b.points;
    });

    let newRank = 1;
    const promisse = result.forEach(async item => {
      await Ranking.update({ position: newRank }, { where: { id: item.id } });
      newRank += 1;
    });

    await Promise.all(promisse);

    return true;
  }
}

export default new GamesController();
