import Ranking from '../models/Ranking';

class RankingController {
  async index(req, res) {
    const { championshipId } = req.query;
    const ranking = await Ranking.findAll({
      where: {
        championship_id: championshipId,
      },
    });

    return res.json({ ranking });
  }
}

export default new RankingController();
