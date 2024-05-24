import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('railway', 'postgres', 'QVWdBmywsWGXxyDClzTVcewbXTnKiWJJ', {
  host: 'viaduct.proxy.rlwy.net',
  dialect: 'postgres',
  port: 31632,
  logging: false
});

function ConnectPostgresql(): void {
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully');
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
  });
}
export { sequelize, ConnectPostgresql};
