// npx ts-node src/module/patterns/creational/abstract-factory.ts

/**
 * The Abstract Factory pattern provides an interface for creating families of related or dependent objects without
 * specifying their concrete types. This pattern allows the client to use abstract classes instead of concrete classes
 * to create families of objects.
 */

interface Database {
  connect(): void;
}

class SqlDatabase implements Database {
  connect(): void {
    console.log('Connected to SQL database...');
  }
}

class NoSqlDatabase implements Database {
  connect(): void {
    console.log('Connected to NoSQL database...');
  }
}

interface DatabaseFactory {
  createDatabase(): Database;
}

class SqlDatabaseFactory implements DatabaseFactory {
  createDatabase(): Database {
    return new SqlDatabase();
  }
}

class NoSqlDatabaseFactory implements DatabaseFactory {
  createDatabase(): Database {
    return new NoSqlDatabase();
  }
}

function main() {
  const databaseFactory: DatabaseFactory = new SqlDatabaseFactory();
  const database: Database = databaseFactory.createDatabase();
  database.connect();

  const databaseFactory2: DatabaseFactory = new NoSqlDatabaseFactory();
  const database2: Database = databaseFactory2.createDatabase();
  database2.connect();
}

main();

export {};
