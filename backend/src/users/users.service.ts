import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async createUser(data: {
    email: string;
    name: string;
    password: string;
    role?: string;
  }) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltOrRounds);
    const user = this.repo.create({
      ...data,
      password: hashedPassword,
      role: data.role || 'user',
    });
    return this.repo.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repo.findOne({ where: { email } });
    return user ?? undefined;
  }
  async findAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.repo.find();
    return users.map(({ ...user }) => user);
  }
  async findById(id: number): Promise<UserResponseDto | undefined> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) return undefined;
    const { ...rest } = user;
    return UserResponseDto.fromEntity(rest as User);
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.repo.update(id, dto);
    return this.findById(id);
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }

  async create(dto: CreateUserDto) {
    const user = this.repo.create(dto);
    return this.repo.save(user);
  }
}
