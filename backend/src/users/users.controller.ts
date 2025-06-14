import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  Request,
  ForbiddenException,
  NotFoundException,
  ParseIntPipe,
  Delete,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { FilterUserDto } from './dto/filter-user.dto';
@ApiTags('Usuários')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Obter informações do próprio usuário' })
  @ApiResponse({
    status: 200,
    description: 'Dados do usuário retornados com sucesso',
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async getProfile(@Request() req: AuthenticatedRequest) {
    return this.usersService.findById(req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  async findAllUsers(
    @Request() req: AuthenticatedRequest,
    @Query() query: FilterUserDto,
  ) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Acesso negado.');
    }
    const { role, sortBy = 'id', order = 'asc' } = query;
    return this.usersService.findAllUsers({ role, sortBy, order });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @ApiOperation({ summary: 'Cadastra novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário Cadastrado com sucesso' })
  async register(
    @Body() createUserDto: CreateUserDto,
    @Request() req: AuthenticatedRequest,
  ) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Acesso negado.');
    }
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados do usuário' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  async update(
    @Request() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (req.user.id !== id && req.user.role !== 'admin') {
      throw new ForbiddenException('Você não pode atualizar outro usuário.');
    }

    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Excluir usuário' })
  @ApiResponse({ status: 200, description: 'Usuário excluído com sucesso' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  async remove(
    @Request() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException(
        'Apenas administradores podem excluir usuários.',
      );
    }

    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return this.usersService.remove(id);
  }
}
