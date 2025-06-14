/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  const mockUsers = [
    {
      id: 1,
      email: 'admin@example.com',
      name: 'Admin',
      role: 'admin',
      password: '123456',
    },
    {
      id: 2,
      email: 'user@example.com',
      name: 'User',
      role: 'user',
      password: '123456',
    },
  ];

  const mockRepo = {
    find: jest.fn().mockResolvedValue(mockUsers),
    findOne: jest.fn((options) =>
      Promise.resolve(
        mockUsers.find(
          (user) =>
            user.id === options.where.id || user.email === options.where.email,
        ),
      ),
    ),
    create: jest.fn((dto) => dto),
    save: jest.fn((user) => Promise.resolve({ id: 3, ...user })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve retornar todos os usuários', async () => {
    const result = await service.findAllUsers();
    expect(result.length).toBe(2);
    expect(repo.find).toHaveBeenCalled();
  });

  it('deve retornar um usuário pelo ID', async () => {
    const user = await service.findById(1);
    expect(user).toBeDefined();

    if (user) {
      expect(user.email).toBe('admin@example.com');
    }
  });

  it('deve retornar um usuário pelo email', async () => {
    await service.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
    });

    const user = await service.findByEmail('admin@example.com');
    expect(user).toBeDefined();

    if (user) {
      expect(user.email).toBe('admin@example.com');
      expect(user.name).toBe('Admin');
    }
  });

  it('deve criar um novo usuário', async () => {
    const newUser = await service.createUser({
      email: 'new@example.com',
      name: 'Novo',
      password: 'senha123',
      role: 'user',
    });

    expect(newUser.email).toBe('new@example.com');
    expect(repo.create).toHaveBeenCalled();
    expect(repo.save).toHaveBeenCalled();
  });
});
