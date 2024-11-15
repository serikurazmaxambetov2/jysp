import {
  IsNegative,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class DChannelCreate {
  @IsNegative({ message: 'IS_NEGATIVE' })
  @IsNumber({}, { message: 'IS_NUMBER' })
  id: number;

  @IsNotEmpty({ message: 'IS_NOT_EMPTY' })
  @IsString({ message: 'IS_STRING' })
  title: string;

  @IsUrl({ host_whitelist: ['t.me'] }, { message: 'IS_URL' })
  @IsString({ message: 'IS_STRING' })
  link: string;

  // Для чтобы задать owner есть отдельный endpoint
}
