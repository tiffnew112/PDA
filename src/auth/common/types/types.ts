import { UserRole } from '../../../generated/prisma/enums.js';

export interface reqProp {
  userId: string;
  email: string;
  role: UserRole;
}
