import { AppDataSource } from "../../src/database/app-data-source";

export async function clearDatabase(): Promise<void> {
  if (!AppDataSource.isInitialized) {
    throw new Error("Database is not initialized");
  }

  const entities = AppDataSource.entityMetadatas;
  
  for (const entity of entities) {
    const repository = AppDataSource.getRepository(entity.name);
    await repository.clear();
  }
}

export async function clearTables(...entityClasses: any[]): Promise<void> {
  if (!AppDataSource.isInitialized) {
    throw new Error("Database is not initialized");
  }

  for (const entityClass of entityClasses) {
    const repository = AppDataSource.getRepository(entityClass);
    await repository.clear();
  }
}

export function getRepository<T>(entityClass: new () => T) {
  return AppDataSource.getRepository(entityClass);
}

