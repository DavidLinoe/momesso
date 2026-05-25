import { AsyncLocalStorage } from 'async_hooks';
import {
  EntityManager,
  EntityTarget,
  ObjectLiteral,
  Repository,
} from 'typeorm';

export interface RlsStore {
  manager: EntityManager;
}

export const rlsStorage = new AsyncLocalStorage<RlsStore>();

export function rlsRepo<T extends ObjectLiteral>(
  fallback: Repository<T>,
  entity: EntityTarget<T>,
): Repository<T> {
  const store = rlsStorage.getStore();
  if (store) return store.manager.getRepository(entity);
  return fallback;
}
