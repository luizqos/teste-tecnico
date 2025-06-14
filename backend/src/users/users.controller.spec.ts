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
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

function mockRequest(user: {
  id?: number;
  role?: string;
}): AuthenticatedRequest {
  return { user } as AuthenticatedRequest;
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
      name: 'Test',
      email: 'test@test.com',
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
      { id: 1, name: 'Admin', email: 'admin@test.com', role: 'admin' },
      { id: 2, name: 'User', email: 'user@test.com', role: 'user' },
    ];
    jest.spyOn(service, 'findAllUsers').mockResolvedValue(users);

    const req = mockRequest({ id: 1, role: 'admin' });
    const result = await controller.findAllUsers(req, {});

    expect(result).toEqual(users);
    expect(service.findAllUsers).toHaveBeenCalledWith({
      role: undefined,
      sortBy: 'id',
      order: 'asc',
    });
  });

  it('should apply filters and sorting', async () => {
    const users = [
      { id: 2, name: 'User', email: 'user@test.com', role: 'user' },
    ];
    jest.spyOn(service, 'findAllUsers').mockResolvedValue(users);

    const req = mockRequest({ id: 1, role: 'admin' });
    const result = await controller.findAllUsers(req, {
      role: 'user',
      sortBy: 'name',
      order: 'desc',
    });

    expect(result).toEqual(users);
    expect(service.findAllUsers).toHaveBeenCalledWith({
      role: 'user',
      sortBy: 'name',
      order: 'desc',
    });
  });

  it('should throw ForbiddenException if user is not admin on findAllUsers', async () => {
    const req = mockRequest({ id: 1, role: 'user' });

    await expect(controller.findAllUsers(req, {})).rejects.toThrow(
      new ForbiddenException('Acesso negado.'),
    );
  });

  it('should create a new user if admin', async () => {
    const createUserDto: CreateUserDto = {
      name: 'New User',
      email: 'new@test.com',
      password: 'password',
      role: 'user',
    };

    const createdUser = { id: 1, ...createUserDto };
    jest.spyOn(service, 'createUser').mockResolvedValue(createdUser as any);

    const req = mockRequest({ id: 1, role: 'admin' });
    const result = await controller.register(createUserDto, req);

    expect(result).toEqual(createdUser);
    expect(service.createUser).toHaveBeenCalledWith(createUserDto);
  });

  it('should throw ForbiddenException if user is not admin on register', async () => {
    const req = mockRequest({ id: 1, role: 'user' });

    await expect(
      controller.register(
        { name: 'Test', email: 'test@test.com', password: '123', role: 'user' },
        req,
      ),
    ).rejects.toThrow(new ForbiddenException('Acesso negado.'));
  });

  it('should update own user data', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Updated Name',
      email: 'updated@test.com',
      password: 'newpassword',
      role: 'user',
    };
    const updatedUser = { id: 1, name: 'Updated Name' };

    jest.spyOn(service, 'update').mockResolvedValue(updatedUser as any);

    const req = mockRequest({ id: 1, role: 'user' });
    const result = await controller.update(req, 1, createUserDto);

    expect(result).toEqual(updatedUser);
    expect(service.update).toHaveBeenCalledWith(1, createUserDto);
  });

  it('should update another user if admin', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Admin Update',
      email: 'adminupdate@test.com',
      password: 'securepassword',
      role: 'user',
    };
    const updatedUser = {
      id: 2,
      name: 'Admin Update',
      email: 'adminupdate@test.com',
      role: 'user',
    };

    jest.spyOn(service, 'update').mockResolvedValue(updatedUser as any);

    const req = mockRequest({ id: 1, role: 'admin' });
    const result = await controller.update(req, 2, createUserDto);

    expect(result).toEqual(updatedUser);
    expect(service.update).toHaveBeenCalledWith(2, createUserDto);
  });

  it('should throw ForbiddenException if user tries to update another user', async () => {
    const req = mockRequest({ id: 1, role: 'user' });

    await expect(
      controller.update(req, 2, {
        name: 'Test',
        email: 'teste@teste.com',
        password: 'teste@123',
        role: 'user',
      }),
    ).rejects.toThrow(
      new ForbiddenException('Você não pode atualizar outro usuário.'),
    );
  });

  it('should remove a user if admin', async () => {
    const user = { id: 2, name: 'Test' };
    jest.spyOn(service, 'findById').mockResolvedValue(user as any);
    jest.spyOn(service, 'remove').mockResolvedValue(user as any);

    const req = mockRequest({ id: 1, role: 'admin' });
    const result = await controller.remove(req, 2);

    expect(result).toEqual(user);
    expect(service.findById).toHaveBeenCalledWith(2);
    expect(service.remove).toHaveBeenCalledWith(2);
  });

  it('should throw NotFoundException if user to delete does not exist', async () => {
    jest.spyOn(service, 'findById').mockResolvedValue(undefined);

    const req = mockRequest({ id: 1, role: 'admin' });

    await expect(controller.remove(req, 999)).rejects.toThrow(
      new NotFoundException('Usuário não encontrado.'),
    );
  });

  it('should throw ForbiddenException if user is not admin on remove', async () => {
    const req = mockRequest({ id: 1, role: 'user' });

    await expect(controller.remove(req, 2)).rejects.toThrow(
      new ForbiddenException('Apenas administradores podem excluir usuários.'),
    );
  });
});
