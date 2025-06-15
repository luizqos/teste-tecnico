import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

describe('AuthService', () => {
  let service: AuthService;

  const mockUser: User = {
    id: 1,
    name: 'Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'admin',
  } as User;

  const mockLoginUser: UserResponseDto = {
    id: 1,
    name: 'Admin',
    email: 'admin@example.com',
    role: 'admin',
  };

  const mockUsersService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const mockUsersRepository = {
    findOne: jest.fn().mockResolvedValue(mockUser),
    save: jest.fn().mockResolvedValue({ ...mockUser, lastLogin: new Date() }),
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
        { provide: getRepositoryToken(User), useValue: mockUsersRepository },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should validate the user with correct credentials', async () => {
    const user = await service.validateUser('admin@example.com', '123456');
    expect(user.email).toBe('admin@example.com');
    expect(mockUsersRepository.findOne).toHaveBeenCalledWith({
      where: { email: 'admin@example.com' },
    });
    expect(mockUsersRepository.save).toHaveBeenCalled();
  });

  it('should throw an exception if credentials are invalid', async () => {
    const wrongPasswordUser = {
      ...mockUser,
      password: bcrypt.hashSync('outrasenha', 10),
    };
    mockUsersRepository.findOne.mockResolvedValueOnce(wrongPasswordUser);

    await expect(
      service.validateUser('admin@example.com', 'senhaErrada'),
    ).rejects.toThrow('Credenciais inválidas');
  });

  it('should throw an exception if the user is not found', async () => {
    mockUsersRepository.findOne.mockResolvedValueOnce(null);

    await expect(
      service.validateUser('inexistente@example.com', '123456'),
    ).rejects.toThrow('Credenciais inválidas');
  });

  it('should return a token on login', () => {
    const token = service.login(mockLoginUser);
    expect(token.access_token).toBe('fake-jwt-token');
    expect(mockJwtService.sign).toHaveBeenCalledWith({
      email: mockLoginUser.email,
      name: mockLoginUser.name,
      sub: mockLoginUser.id,
      role: mockLoginUser.role,
    });
  });
});
