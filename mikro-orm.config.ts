import { Options } from '@mikro-orm/core';
import { SeedManager } from '@mikro-orm/seeder';
import { SqliteDriver } from '@mikro-orm/sqlite';

const config: Options = {
  entities: ['./dist/src/entities'],
  entitiesTs: ['./src/entities'],
  dbName: 'example.sqlite3',
  driver: SqliteDriver,
  migrations: {
    path: './migrations', // Carpeta donde se generarán las migraciones
    pathTs: './src/migrations', // Para TypeScript
  },
  extensions: [SeedManager],
};

export default config;
