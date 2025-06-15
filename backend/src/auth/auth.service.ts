import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  getJwtSecret() {
    return this.configService.get<string>('JWT_SECRET');
  }

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserResponseDto> {
    const user = await this.usersRepository.findOne({
      where: { email, status: true },
    });
    if (!user) {
      throw new UnauthorizedException('Acesso negado');
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    user.lastLogin = new Date();
    await this.usersRepository.save(user);

    const { ...result } = user;
    return result;
  }

  login(user: UserResponseDto): { access_token: string } {
    const payload = {
      email: user.email,
      name: user.name,
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(dto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(dto.email);
    if (existingUser) {
      throw new UnauthorizedException('Usuário já existe com este e-mail');
    }
    if (!dto.email || !dto.name || !dto.password) {
      throw new UnauthorizedException('Dados inválidos para registro');
    }
    const password = await this.hashPassword(dto.password);
    const newUser = await this.usersService.create({
      email: dto.email.toLowerCase(),
      name: dto.name.toUpperCase(),
      password,
      role: 'user',
    });
    if (!newUser) {
      throw new UnauthorizedException('Erro ao registrar usuário');
    }
    return this.login(newUser);
  }
}
