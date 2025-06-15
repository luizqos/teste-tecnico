import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

  async createUser(data: {
    email: string;
    name: string;
    password: string;
    role?: string;
  }) {
    const existingUser = await this.findByEmail(data.email);
    if (existingUser) {
      throw new Error('Usuário já existe com este e-mail.');
    }
    if (!data.email || !data.name || !data.password) {
      throw new Error('Todos os campos são obrigatórios.');
    }
    const password = await this.hashPassword(data.password);
    const user = this.usersRepository.create({
      email: data.email.toLowerCase(),
      name: data.name.toUpperCase(),
      password,
      role: data.role || 'user',
    });
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user ?? undefined;
  }

  async findAllUsers(params: {
    role?: string;
    sortBy: string;
    order: 'asc' | 'desc';
    daysWithoutLogin?: string;
  }): Promise<UserResponseDto[]> {
    const { role, sortBy, order, daysWithoutLogin } = params;

    const user: Record<string, any> = {};
    if (role) {
      user.role = role;
    }

    let where: Record<string, any> | Record<string, any>[] = user;

    if (daysWithoutLogin) {
      const days = parseInt(daysWithoutLogin, 10);
      const dateThreshold = new Date();
      dateThreshold.setDate(dateThreshold.getDate() - days);

      user.status = true;
      where = [
        { ...user, lastLogin: null, createdAt: LessThan(dateThreshold) },
        { ...user, lastLogin: LessThan(dateThreshold) },
      ];
    }

    const users = await this.usersRepository.find({
      where,
      order: {
        [sortBy]: order.toUpperCase(),
      },
    });

    return users.map(({ ...user }) => user);
  }

  async findById(id: number): Promise<UserResponseDto | undefined> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) return undefined;
    const { ...rest } = user;
    return UserResponseDto.fromEntity(rest as User);
  }

  async update(id: number, dto: UpdateUserDto) {
    dto.name = dto.name?.toUpperCase();
    dto.email = dto.email?.toLowerCase();
    if (dto.email) {
      const existingUser = await this.findByEmail(dto.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error('Já existe um usuário com este e-mail.');
      }
    }
    if (dto.password) {
      dto.password = await this.hashPassword(dto.password);
    }
    await this.usersRepository.update(id, dto);
    return this.findById(id);
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }
    const updatedUser = { ...user, status: false };
    await this.usersRepository.update(id, updatedUser);
    if (user.id === 1) {
      throw new Error('Não é possível excluir o usuário administrador master.');
    }
    return this.findById(id);
  }

  async create(dto: CreateUserDto) {
    const user = this.usersRepository.create(dto);
    return this.usersRepository.save(user);
  }
}
