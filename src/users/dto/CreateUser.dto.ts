import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserSettingDto {
  @IsOptional()
  @IsBoolean()
  receiveNotifications?: boolean;

  @IsOptional()
  @IsBoolean()
  receiveEmails?: boolean;

  @IsOptional()
  @IsBoolean()
  receiveSms?: boolean;
}
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  setting?: CreateUserSettingDto;
}
