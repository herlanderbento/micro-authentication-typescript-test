import { Entity } from '~/_shared/domain/entities/entity';
import { InMemoryRepository } from '../in-memory.repository';
import { EntityID } from '~/_shared/domain/value-object/entity-id.vo';
import { NotFoundError } from '~/_shared/domain/errors';

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {
  constructor(props: StubEntityProps, id?: EntityID) {
    super(props, id);
  }

  get name() {
    return this.props.name;
  }

  get price() {
    return this.props.price;
  }

  toJSON() {
    return {
      id: this.id.toValue(),
      name: this.props.name,
      price: this.props.price,
    };
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }
}

describe('InMemoryRepository Unit Tests', () => {
  let repository: StubInMemoryRepository;

  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });

  test('should insert a new entity', async () => {
    const entity = new StubEntity({ name: 'Example', price: 100 });

    await repository.insert(entity);

    expect(repository.items.length).toBe(1);
    expect(repository.items[0].toJSON()).toStrictEqual(entity.toJSON());
  });

  test('should bulk insert entities', async () => {
    const entities = [
      new StubEntity({
        name: 'Test',
        price: 100,
      }),
      new StubEntity({
        name: 'Test',
        price: 100,
      }),
    ];

    await repository.bulkInsert(entities);

    expect(repository.items.length).toBe(2);
    expect(repository.items[0]).toBe(entities[0]);
    expect(repository.items[1]).toBe(entities[1]);
  });

  it('should returns all entities', async () => {
    const entity = new StubEntity({ name: 'name value', price: 5 });
    await repository.insert(entity);

    const entities = await repository.findAll();

    expect(entities).toStrictEqual([entity]);
  });

  it('should throws error on update when entity not found', async () => {
    const entity = new StubEntity({
      name: 'name value',
      price: 5,
    });
    await expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(entity.id, StubEntity)
    );
  });

  it('should updates an entity', async () => {
    const entity = new StubEntity({ name: 'name value', price: 5 });
    await repository.insert(entity);

    const entityUpdated = new StubEntity(
      {
        name: 'updated',
        price: 1,
      },
      entity.id
    );
    await repository.update(entityUpdated);
    expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it('should throws error on delete when entity not found', async () => {
    const entityId = new EntityID();
    await expect(repository.delete(entityId.toValue())).rejects.toThrow(
      new NotFoundError(entityId, StubEntity)
    );

    await expect(
      repository.delete('9366b7dc-2d71-4799-b91c-c64adb205104')
    ).rejects.toThrow(
      new NotFoundError('9366b7dc-2d71-4799-b91c-c64adb205104', StubEntity)
    );
  });

  it('should deletes an entity', async () => {
    const entity = new StubEntity({ name: 'name value', price: 5 });
    await repository.insert(entity);

    await repository.delete(entity.id.toString());
    expect(repository.items).toHaveLength(0);
  });
});
