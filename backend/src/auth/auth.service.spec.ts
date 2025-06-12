import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;

  const mockUser = {
    id: 1,
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'admin',
  };

  const mockUsersService = {
    findByEmail: jest
      .fn()
      .mockImplementation((email) =>
        email === 'admin@example.com' ? Promise.resolve(mockUser) : null,
      ),
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
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('deve validar o usuário com credenciais corretas', async () => {
    const user = await service.validateUser('admin@example.com', '123456');
    expect(user.email).toBe('admin@example.com');
  });

  it('deve lançar exceção se credenciais forem inválidas', async () => {
    await expect(
      service.validateUser('admin@example.com', 'wrongpass'),
    ).rejects.toThrow();
  });

  it('deve retornar um token no login', async () => {
    const token = await service.login(mockUser);
    expect(token.access_token).toBe('fake-jwt-token');
  });
});
