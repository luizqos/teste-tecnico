import { Request } from 'express';
import { userPayload } from './users.interface';

export interface AuthenticatedRequest extends Request {
  user: userPayload;
}
