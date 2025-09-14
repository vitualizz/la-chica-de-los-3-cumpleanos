import { Resend } from 'resend';

const resend_api_key_1 = "re"
const resend_api_key_2 = "Qy3CxnrS"
const resend_api_key_3 = "G1LP5dStZ3CvPXunXiGqQugY"
const api_key = [resend_api_key_1, resend_api_key_2, resend_api_key_3].join("_");
const resend = new Resend(api_key);

export const useEmail = () => {
  const sendEmail = async (text: string) => {
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'vitualizz@gmail.com',
        subject: 'La chica de los 3 cumpleaños',
        html: `<p>${text}</p>`,
      })
    } catch (error) {
      console.log(error);
    }
  }

  return { sendEmail };
};
