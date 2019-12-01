import Sequelize, { Model } from 'sequelize';

class Ranking extends Model {
  static init(sequelize) {
    super.init(
      {
        victories: Sequelize.INTEGER,
        position: Sequelize.INTEGER,
        points: Sequelize.INTEGER,
        goals: Sequelize.INTEGER,
        pro_goals: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Championship, {
      foreignKey: 'championship_id',
      as: 'championship',
    });
    this.belongsTo(models.Team, {
      foreignKey: 'team_id',
      as: 'team',
    });
  }
}

export default Ranking;
