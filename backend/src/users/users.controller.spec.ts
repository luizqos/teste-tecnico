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
import { UpdateUserDto } from './dto/update-user.dto';

function mockRequest(user: { id: number; role: string }): AuthenticatedRequest {
  return { user } as AuthenticatedRequest;
}

const createMockUser = (id: number, role = 'user') => ({
  id,
  name: `User${id}`,
  email: `user${id}@test.com`,
  password: 'password',
  role,
  createdAt: new Date(),
});

const createMockUserDto = (id: number): CreateUserDto => ({
  name: `User${id}`,
  email: `user${id}@test.com`,
  password: 'password',
  role: 'user',
});

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Get Profile', () => {
    it('should return user profile', async () => {
      const user = createMockUser(1);
      jest.spyOn(service, 'findById').mockResolvedValue(user as any);

      const req = mockRequest({ id: 1, role: 'user' });
      const result = await controller.getProfile(req);

      expect(result).toEqual(user);
      expect(service.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('Find All Users', () => {
    it('should return all users if admin', async () => {
      const users = [createMockUser(1, 'admin'), createMockUser(2)];
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
      const users = [createMockUser(2)];
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

    it('should throw ForbiddenException if not admin', async () => {
      const req = mockRequest({ id: 1, role: 'user' });

      await expect(controller.findAllUsers(req, {})).rejects.toThrow(
        new ForbiddenException('Acesso negado.'),
      );
    });
  });

  describe('Register User', () => {
    it('should create a new user if admin', async () => {
      const dto = createMockUserDto(3);
      const createdUser = { id: 3, ...dto };
      jest.spyOn(service, 'createUser').mockResolvedValue(createdUser as any);

      const req = mockRequest({ id: 1, role: 'admin' });
      const result = await controller.register(dto, req);

      expect(result).toEqual(createdUser);
      expect(service.createUser).toHaveBeenCalledWith(dto);
    });

    it('should throw ForbiddenException if not admin', async () => {
      const req = mockRequest({ id: 1, role: 'user' });

      await expect(
        controller.register(createMockUserDto(3), req),
      ).rejects.toThrow(new ForbiddenException('Acesso negado.'));
    });
  });

  describe('Update User', () => {
    const dto: UpdateUserDto = {
      name: 'Updated Name',
      email: 'updated@test.com',
      password: 'newpassword',
      role: 'user',
    };

    it('should update own user', async () => {
      const user = { id: 1, ...dto };
      jest.spyOn(service, 'update').mockResolvedValue(user as any);
      jest.spyOn(service, 'findById').mockResolvedValue(user as any);

      const req = mockRequest({ id: 1, role: 'user' });
      const result = await controller.update(req, 1, dto);

      expect(result).toEqual(user);
      expect(service.update).toHaveBeenCalledWith(1, dto);
      expect(service.findById).toHaveBeenCalledWith(1);
    });

    it('should update another user if admin', async () => {
      const user = { id: 2, ...dto };
      jest.spyOn(service, 'update').mockResolvedValue(user as any);
      jest.spyOn(service, 'findById').mockResolvedValue(user as any);

      const req = mockRequest({ id: 1, role: 'admin' });
      const result = await controller.update(req, 2, dto);

      expect(result).toEqual(user);
      expect(service.update).toHaveBeenCalledWith(2, dto);
      expect(service.findById).toHaveBeenCalledWith(2);
    });

    it('should throw ForbiddenException if user tries to update another user', async () => {
      const req = mockRequest({ id: 1, role: 'user' });

      await expect(controller.update(req, 2, dto)).rejects.toThrow(
        new ForbiddenException('Você não pode atualizar outro usuário.'),
      );
    });
  });

  describe('Remove User', () => {
    it('should remove a user if admin', async () => {
      const user = createMockUser(2);
      jest.spyOn(service, 'findById').mockResolvedValue(user as any);
      jest.spyOn(service, 'remove').mockResolvedValue(user as any);

      const req = mockRequest({ id: 1, role: 'admin' });
      const result = await controller.remove(req, 2);

      expect(result).toEqual(user);
      expect(service.findById).toHaveBeenCalledWith(2);
      expect(service.remove).toHaveBeenCalledWith(2);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue(undefined);

      const req = mockRequest({ id: 1, role: 'admin' });

      await expect(controller.remove(req, 999)).rejects.toThrow(
        new NotFoundException('Usuário não encontrado.'),
      );
    });

    it('should throw ForbiddenException if not admin', async () => {
      const req = mockRequest({ id: 1, role: 'user' });

      await expect(controller.remove(req, 2)).rejects.toThrow(
        new ForbiddenException(
          'Apenas administradores podem excluir usuários.',
        ),
      );
    });
  });
});
