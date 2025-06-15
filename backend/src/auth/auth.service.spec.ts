/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { Repository } from 'typeorm';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let usersRepository: jest.Mocked<Repository<User>>;
  let jwtService: JwtService;

  const mockUser: User = {
    id: 1,
    name: 'Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'admin',
    status: true,
    lastLogin: new Date(),
  } as User;

  const mockLoginUser: UserResponseDto = {
    id: 1,
    name: 'Admin',
    email: 'admin@example.com',
    role: 'admin',
    createdAt: new Date(),
  };

  const mockUsersService = {
    findByEmail: jest.fn(),
    create: jest.fn().mockResolvedValue(mockLoginUser),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('fake-jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersRepository = module.get(getRepositoryToken(User));
    jwtService = module.get(JwtService);
  });

  describe('validateUser', () => {
    it('should validate the user with correct credentials', async () => {
      usersRepository.findOne.mockResolvedValueOnce(mockUser);
      usersRepository.save.mockResolvedValueOnce(mockUser);

      const user = await authService.validateUser(
        'admin@example.com',
        '123456',
      );

      expect(user.email).toBe('admin@example.com');
      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'admin@example.com', status: true },
      });
      expect(usersRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
          lastLogin: expect.any(Date),
        }),
      );
    });

    it('should throw if the password is incorrect', async () => {
      const userWithDifferentPassword = {
        ...mockUser,
        password: bcrypt.hashSync('wrongpassword', 10),
      };
      usersRepository.findOne.mockResolvedValueOnce(userWithDifferentPassword);

      await expect(
        authService.validateUser('admin@example.com', 'invalidpassword'),
      ).rejects.toThrow(new UnauthorizedException('Credenciais inválidas'));

      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'admin@example.com', status: true },
      });
    });

    it('should throw if user does not exist', async () => {
      usersRepository.findOne.mockResolvedValueOnce(null);

      await expect(
        authService.validateUser('nonexistent@example.com', '123456'),
      ).rejects.toThrow(new UnauthorizedException('Acesso negado'));

      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'nonexistent@example.com', status: true },
      });
    });
  });

  describe('login', () => {
    it('should return an access token', () => {
      const token = authService.login(mockLoginUser);

      expect(token).toEqual({ access_token: 'fake-jwt-token' });
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        email: 'admin@example.com',
        name: 'Admin',
        sub: 1,
        role: 'admin',
        createdAt: expect.any(Date),
      });
    });
  });

  describe('register', () => {
    it('should register a new user and return token', async () => {
      mockUsersService.findByEmail = jest.fn().mockResolvedValue(null);

      const registerDto: RegisterDto = {
        email: 'newuser@example.com',
        name: 'New User',
        password: 'password123',
        role: 'user',
      };

      const token = await authService.register(registerDto);

      expect(mockUsersService.create).toHaveBeenCalledWith({
        email: 'newuser@example.com',
        name: 'NEW USER',
        password: expect.any(String),
        role: 'user',
      });

      expect(token).toEqual({ access_token: 'fake-jwt-token' });
    });

    it('should throw if user already exists', async () => {
      mockUsersService.findByEmail = jest.fn().mockResolvedValue(mockUser);

      await expect(
        authService.register({
          email: 'admin@example.com',
          name: 'Admin',
          password: '123456',
          role: 'user',
        }),
      ).rejects.toThrow(
        new UnauthorizedException('Usuário já existe com este e-mail'),
      );

      expect(mockUsersService.findByEmail).toHaveBeenCalledWith(
        'admin@example.com',
      );
    });

    it('should throw if registration data is incomplete', async () => {
      mockUsersService.findByEmail = jest.fn().mockResolvedValue(null);

      await expect(
        authService.register({
          email: '',
          name: '',
          password: '',
          role: 'user',
        }),
      ).rejects.toThrow(
        new UnauthorizedException('Dados inválidos para registro'),
      );
    });
  });

  describe('updateProfile', () => {
    it('should update user profile successfully', async () => {
      usersRepository.findOne.mockResolvedValueOnce(mockUser);
      usersRepository.save.mockResolvedValueOnce({
        ...mockUser,
        name: 'JOHN DOE',
      });

      const result = await authService.updateProfile(1, {
        name: 'John Doe',
        id: 1,
      });

      expect(result).toEqual({ message: 'Perfil atualizado com sucesso' });
      expect(usersRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'JOHN DOE' }),
      );
    });

    it('should throw if user not found', async () => {
      usersRepository.findOne.mockResolvedValueOnce(null);

      await expect(
        authService.updateProfile(999, {
          name: 'test',
          id: 0,
        }),
      ).rejects.toThrow(new NotFoundException('Usuário não encontrado'));
    });
  });
});
