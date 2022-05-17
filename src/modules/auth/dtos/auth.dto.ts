import { pick } from 'lodash';
export class AuthDto {
  userId: number;
  authId: number;
  email: string;
  username: string;
  constructor(userId: number, authId: number, email: string, username: string) {
    this.userId = userId;
    this.authId = authId;
    this.email = email;
    this.username = username;
  }
}
