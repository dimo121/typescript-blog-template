import React, { useState } from 'react';
import { EmailService } from '../controllers/EmailService/EmailService';

const Contact:React.FC = () => {

    const [name,setName] = useState<string>('');
    const [email,setEmail] = useState<string>('');
    const [subject,setSubject] = useState<string>('');
    const [content,setContent] = useState<string>(``);
    const [error,setError] = useState<string>('');
    
    const emailService: EmailService = new EmailService();

    const onSubmit = (e:React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();

        try{ 
            emailService.sendEmail({name,email,subject,content})
            console.log("Email sent successfully : ",name," ",email," ",subject," ",content);
        }catch(e:any){
            setError(e);
            console.log(e);
        }

    }

    return (
        <div className='s4-cc'>
            <h1>Contact us</h1>
            <h5><i>Please fill in the form and we will respond within 48 business hours</i></h5>
            <div className="s4-cc__ec">
                <form onSubmit={onSubmit}>
                    <label htmlFor="name">Name:</label>
                    <br />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder=""
                        onChange={(e: React.ChangeEvent<HTMLInputElement>):void => setName(e.target.value)}
                    ></input>
                    <br />
                    <br />
                    <label htmlFor="email">Email:</label>
                    <br />
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder=""
                        onChange={(e: React.ChangeEvent<HTMLInputElement>):void => setEmail(e.target.value)}
                    ></input>
                    <br />
                    <br />
                    <label htmlFor="title">Subject:</label>
                    <br />
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder=""
                        onChange={(e: React.ChangeEvent<HTMLInputElement>):void => setSubject(e.target.value)}
                    ></input>
                    <br />
                    <br />
                    <label htmlFor="content">Content:</label>
                    <br />
                    <textarea
                        id="content"
                        name="content"
                        cols={100}
                        rows={20}
                        placeholder=""
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>):void => setContent(e.target.value)}
                    ></textarea>
                    <br />
                    <br />
                    <input className="button" type="submit" value="Send" />
                </form>
                {error && <p className="s4-cc__entry-error">Error : {error}</p>}
            </div>
        </div>
    )
}

export default Contact;