export enum EmailTemplatesTypes {
    Signup = "signup",
    ResetPassword = "resetPassword"
}

export type MailOptions = {
    to: string,
    subject: string,
    text: string
};