import { Controller } from '@nestjs/common';
import { ChannelRelationService } from './channel-relation.service';

@Controller('channel-relation')
export class ChannelRelationController {
  constructor(private channelRelationService: ChannelRelationService) {}
}
