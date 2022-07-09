import { Body, Controller, Post } from '@nestjs/common';
import { InputEmail } from './dto/input-send-email.dto';
import { SendgridService } from './sendgrid.service';

@Controller('sendgrid')
export class SendgridController {
  constructor(private readonly sendgridService: SendgridService) {}

  @Post('send-email')
  async sendEmail(@Body('') arg: InputEmail) {
    const { from, to, message, template_id } = arg;
    let msg: any = {};
    if (template_id) {
      msg = {
        to,
        from,
        dynamic_template_data: { message },
        template_id,
      };
    } else {
      msg = {
        to,
        from,
        subject: 'Confirm Email',
        text: message,
      };
    }
    return await this.sendgridService.send(msg);
  }
}
