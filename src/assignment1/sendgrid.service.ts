import { Injectable } from '@nestjs/common';
import * as sendgrid from "@sendgrid/mail";
@Injectable()
export class SendgridService {
    constructor() {
        sendgrid.setApiKey(process.env.API_KEY)
    }

    async send(mail: sendgrid.MailDataRequired) {
        const transport = await sendgrid.send(mail);
        return transport;
    }
}
