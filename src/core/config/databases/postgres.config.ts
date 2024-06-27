// import { Sequelize } from "sequelize-typescript";
// import { Book } from "../../../books/book.schema";

// const sequelize = new Sequelize({
//   username: 'postgres',
//   password: 'EhipEaPHybYloApsfCPsDJMhfzvjCnjr',
//   host: 'postgres.railway.internal', // Specify your host here
//   port: 30141, // Specify your port here (default PostgreSQL port is 5432)
//   database: 'railway',
//   dialect: 'postgres',
//   models: [Book],
// });

// function ConnectPostgresql(): void {
//   sequelize
//     .sync()
//     .then(() => {
//       console.log("Database connection has been established successfully");
//     })
//     .catch((err: Error) => {
//       console.error("Unable to connect to the database:", err);
//     });
// }
// export { ConnectPostgresql };

// // export default sequelize;

// // import { Sequelize } from 'sequelize';

// // const sequelize = new Sequelize('railway', 'postgres', 'QVWdBmywsWGXxyDClzTVcewbXTnKiWJJ', {
// //   host: 'viaduct.proxy.rlwy.net',
// //   dialect: 'postgres',
// //   port: 31632,
// //   logging: false
// // });


// // import { Sequelize } from 'sequelize';

// // const sequelize = new Sequelize('railway', 'postgres', 'QVWdBmywsWGXxyDClzTVcewbXTnKiWJJ', {
// //   host: 'viaduct.proxy.rlwy.net',
// //   dialect: 'postgres',
// //   port: 31632,
// //   logging: false
// // });

// // function ConnectPostgresql(): void {
// // sequelize.authenticate()
// //   .then(() => {
// //     console.log('Database connection has been established successfully');
// //   })
// //   .catch((err: Error) => {
// //     console.error('Unable to connect to the database:', err);
// //   });
// // }
// // export { sequelize, ConnectPostgresql};
