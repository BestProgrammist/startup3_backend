import { IsString } from 'class-validator';

export class TokenDto {
  @IsString({ message: 'You did not pass refreshtoken or it is not string?' })
  refreshToken: string;
}
