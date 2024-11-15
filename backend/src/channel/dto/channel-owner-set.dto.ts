import { IsNumber } from 'class-validator';

export class DChannelOwnerSet {
  @IsNumber({}, { message: 'IS_NUMBER' })
  id: number; // ID владельца канала
}
