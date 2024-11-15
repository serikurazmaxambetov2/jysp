import { Transform } from 'class-transformer';
import { IsNegative, IsNumber } from 'class-validator';

export class DChannelFindById {
  @IsNegative({ message: 'IS_NEGATIVE' })
  @IsNumber({}, { message: 'IS_NUMBER' })
  @Transform(({ value }: { value: string }) => +value)
  id: number;
}
