/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';

function mockRequest(user: {
  id?: number;
  role?: string;
}): AuthenticatedRequest {
  return {
    user,
  } as AuthenticatedRequest;
}

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

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
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      role: 'user',
    };

    jest.spyOn(service, 'findById').mockResolvedValue(mockUser as any);

    const req = mockRequest({ id: 1, role: 'admin' });
    const result = await controller.getProfile(req);

    expect(result).toEqual(mockUser);
    expect(service.findById).toHaveBeenCalledWith(1);
  });

  it('should return all users if admin', async () => {
    const users = [
      { id: 1, email: 'admin@example.com', name: 'Admin User', role: 'admin' },
      { id: 2, email: 'user@example.com', name: 'Normal User', role: 'user' },
    ];
    jest.spyOn(service, 'findAllUsers').mockResolvedValue(users);

    const req = mockRequest({ id: 1, role: 'admin' });
    const result = await controller.findAllUsers(req);

    expect(result).toEqual(users);
    expect(service.findAllUsers).toHaveBeenCalled();
  });

  it('should throw ForbiddenException if user is not admin', async () => {
    const req = mockRequest({ id: 1, role: 'user' });
    await expect(controller.findAllUsers(req)).rejects.toThrow(
      'Acesso negado.',
    );
  });
});
