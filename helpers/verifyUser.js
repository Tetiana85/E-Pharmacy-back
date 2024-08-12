import sendgrid from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

const { SENDGRID_API } = process.env;
sendgrid.setApiKey(SENDGRID_API);
export const sendEmail = async (data) => {
  const email = { ...data, from: "chiernokur5@gmail.com" };
  await sendgrid.send(email);
  return true;
};
