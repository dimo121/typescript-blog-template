import { config } from '../../config';
import { send } from 'emailjs-com';
import { EmailMessage } from '../../types/TypeDefs';

export class EmailService {

    public async sendEmail(message: EmailMessage): Promise<void> {

        const templateParams = { ...message };

        try{

            await send(config.EMAIL_SERVICE_ID, config.EMAIL_TEMPLATE_ID, templateParams, config.EMAIL_USER_ID);

        } catch(err:any){

            throw new Error(err);
        }
    }

}
