module.exports = {
  'type': 'postgres',
  'host': process.env.POSTGRES_HOST,
  'port': Number(process.env.POSTGRES_PORT),
  'username': process.env.POSTGRES_USER,
  'password': process.env.POSTGRES_PASSWORD,
  'database': process.env.POSTGRES_DB,
  'logging': true,
  'entities': [
    'dist/**/*.entity.js'
  ],
  'migrations': [
    'dist/migrations/*.js'
  ],
  'migrationsTableName': 'migrations',
  'migrationsRun': true
}