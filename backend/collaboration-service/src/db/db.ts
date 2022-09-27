import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      '[Collaboration Service] In-Memory Database connection has been successfully established.'
    );
  } catch (error) {
    console.error(
      '[Collaboration Service] Unable to connect to the database:',
      error
    );
  }
};

checkConnection();
(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();

export { sequelize };
