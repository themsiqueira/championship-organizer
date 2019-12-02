module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('rankings', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      team_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'teams',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: false,
        },
      },
      championship_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'championships',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: false,
        },
      },
      victories: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      position: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      points: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      pro_goals: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      goals: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('rankings');
  },
};
