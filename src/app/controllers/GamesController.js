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
    const { gameId, firstTeamGoals, secondTeamGoals } = req.body;

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

    const updateRanking = gamesController.setNewRanking(
      gameToUpdate,
      firstTeamGoals,
      secondTeamGoals
    );

    if (updateRanking) {
      return res.json({ message: 'Sucess to update game and ranking' });
    }

    return res.status(500).json({ message: 'Error to update ranking' });
  }

  async setNewRanking(game, firstTeamGoals, secondTeamGoals) {
    const ranking = await Ranking.findAll({
      where: { championship_id: game.championship_id },
    });
    let pointsToOrdenate;

    if (firstTeamGoals > secondTeamGoals) {
      ranking.map(item => {
        if (item.team_id === game.first_team_id) {
          const newPoints = item.points + 3;
          Ranking.update(
            { points: newPoints },
            {
              where: { team_id: item.team_id },
            }
          );
        }
        pointsToOrdenate.push(item.points);
      });
    } else if (firstTeamGoals === secondTeamGoals) {
      ranking.map(item => {
        if (
          item.team_id === game.first_team_id ||
          item.team_id === game.second_team_id
        ) {
          const newPoints = item.points + 1;
          item.update({ points: newPoints });
        }
      });
    } else {
      ranking.map(item => {
        if (item.team_id === game.second_team_id) {
          const newPoints = item.points + 3;
          item.update({ points: newPoints });
        }
      });
    }

    const rankToUpdate = await Ranking.findAll({
      where: { championship_id: game.championship_id },
    });

    const result = rankToUpdate.sort((a, b) => (a.points > b.points ? 1 : -1));

    let newPosition;
    result.map(async item => {
      newPosition += 1;
      await item.update({ position: newPosition });
    });

    return true;
  }
}

export default new GamesController();
