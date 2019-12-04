import Sequelize, { Model } from 'sequelize';

class Championship extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        complete: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}

export default Championship;
