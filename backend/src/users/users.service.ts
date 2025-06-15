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

  async createUser(data: {
    email: string;
    name: string;
    password: string;
    role?: string;
  }) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltOrRounds);
    const user = this.usersRepository.create({
      ...data,
      password: hashedPassword,
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
    const saltOrRounds = 10;
    if (dto.password) {
      const hashedPassword = await bcrypt.hash(dto.password, saltOrRounds);
      dto.password = hashedPassword;
    }
    await this.usersRepository.update(id, dto);
    return this.findById(id);
  }

  async remove(id: number) {
    return this.usersRepository.delete(id);
  }

  async create(dto: CreateUserDto) {
    const user = this.usersRepository.create(dto);
    return this.usersRepository.save(user);
  }
}
