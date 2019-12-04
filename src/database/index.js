import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Team from '../app/models/Team';
import Championship from '../app/models/Championship';
import Games from '../app/models/Games';
import Ranking from '../app/models/Ranking';

const models = [User, Team, Championship, Games, Ranking];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
