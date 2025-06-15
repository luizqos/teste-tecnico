import {
  Body,
  Controller,
  ForbiddenException,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtAuthGuard } from './auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { RolesGuard } from './roles.guard';
import { AuthenticatedRequest } from './interfaces/authenticated-request.interface';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Autentica um usuário' })
  @ApiResponse({ status: 200, description: 'Token JWT gerado' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    return this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registrar novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Patch('profile')
  @ApiOperation({ summary: 'Atualizar perfil do usuário' })
  @ApiResponse({ status: 200, description: 'Perfil atualizado com sucesso' })
  async updateProfile(
    @Request() req: AuthenticatedRequest,
    @Body() body: UpdateProfileDto,
  ) {
    if (req.user.id !== body.id) {
      throw new ForbiddenException(
        'Você não tem permissão para atualizar este perfil',
      );
    }
    const { id } = body;

    return this.authService.updateProfile(id, body);
  }
}
