// npx ts-node src/module/patterns/creational/abstract-factory-02.ts

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

function clientCode(databaseFactory: DatabaseFactory) {
  const database: Database = databaseFactory.createDatabase();
  database.connect();
}

function main() {
  clientCode(new SqlDatabaseFactory());
  clientCode(new NoSqlDatabaseFactory());
}

main();

export {};
