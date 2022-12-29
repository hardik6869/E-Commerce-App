// Etherial Email

import { createTransport, getTestMessageUrl } from "nodemailer";

const transport = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const makeANiceEmail = (text: string): string => {
  return `
    <div style="
     border: 1px solid black; 
     padding: 20px;
     font-family: sans-serif;
     line-height: 2;
     font-size: 20px;
    "> 
    <h2> Hello THere! </h2>
    <p> ${text} </p>
    <p> Sick FIts </p>
    </div>
    `;
};

export interface MailResponse {
  accepted?: string[] | null;
  rejected?: null[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}

export interface Envelope {
  from: string;
  to?: string[] | null;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  // email the user a token
  const info = await transport.sendMail({
    to,
    from: "hardik@gmail.com",
    subject: "Your password reset token!",
    html: makeANiceEmail(`Your Password Reset Token is here!
         <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}"> Click Here to reset </a>
        `),
  });

  if (process.env.MAIL_USER.includes("ethereal.email")) {
    console.log(` Message Sent! Preview it at ${getTestMessageUrl(info)}`);
  }
}
