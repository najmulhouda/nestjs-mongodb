import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class UserSetting {
  @Prop({ required: false })
  receiveNotifications?: boolean;

  @Prop({ required: false })
  receiveEmails?: boolean;

  @Prop({ required: false })
  receiveSms?: boolean;
}
