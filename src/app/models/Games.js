import Sequelize, { Model } from 'sequelize';

class Games extends Model {
  static init(sequelize) {
    super.init(
      {
        first_team_goals: Sequelize.INTEGER,
        second_team_goals: Sequelize.INTEGER,
        complete: Sequelize.BOOLEAN,
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
      foreignKey: 'first_team_id',
      as: 'first_team',
    });
    this.belongsTo(models.Team, {
      foreignKey: 'second_team_id',
      as: 'second_team',
    });
  }
}

export default Games;
