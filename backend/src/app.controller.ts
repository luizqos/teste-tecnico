import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller('health')
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Verifica a saúde da aplicação' })
  @ApiResponse({ status: 200, description: 'Aplicação está saudável' })
  getHello(): string {
    return 'Hello World!';
  }
}
