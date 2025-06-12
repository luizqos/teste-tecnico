import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async create(data: Partial<User>): Promise<User> {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

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
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.repo.find();
    return users.map(({ password, ...user }) => user);
  }
  async findById(id: number): Promise<UserResponseDto | undefined> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) return undefined;
    const { password, ...rest } = user;
    return UserResponseDto.fromEntity(rest as User);
  }
}
