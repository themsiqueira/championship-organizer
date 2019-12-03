import Ranking from '../models/Ranking';
import Team from '../models/Team';

class RankingController {
  async index(req, res) {
    const { championshipId } = req.query;
    const ranking = await Ranking.findAll({
      where: {
        championship_id: championshipId,
      },
      include: [
        {
          model: Team,
          as: 'team',
          attributes: ['name', 'id'],
        },
      ],
    });

    return res.json({ message: 'Sucess to find ranking', ranking });
  }
}

export default new RankingController();
