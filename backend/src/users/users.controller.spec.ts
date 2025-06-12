import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  // Mock básico do repositório
  const mockUserRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return user profile', async () => {
    // Mock completo do UserResponseDto que seu método deve retornar
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      role: 'user', // importante ter o role
    };

    // Mocka o método findById do service para retornar o mock completo
    jest.spyOn(service, 'findById').mockResolvedValue(mockUser as any);

    const req = { user: { id: 1 } };
    const result = await controller.getProfile(req);

    expect(result).toEqual(mockUser);
    expect(service.findById).toHaveBeenCalledWith(1);
  });

  it('should return all users if admin', async () => {
    // Arrange
    const users = [
      { id: 1, email: 'admin@example.com', name: 'Admin User', role: 'admin' },
      { id: 2, email: 'user@example.com', name: 'Normal User', role: 'user' },
    ];
    jest.spyOn(service, 'findAll').mockResolvedValue(users);

    // Act
    const req = { user: { role: 'admin' } };
    const result = await controller.findAll(req);

    // Assert
    expect(result).toEqual(users);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should throw ForbiddenException if user is not admin', async () => {
    const req = { user: { role: 'user' } };
    await expect(controller.findAll(req)).rejects.toThrow(
      'Acesso negado. Apenas administradores.',
    );
  });
});
