import { ApiResponse } from './../types/ApiResponse';
import { resend } from '@/lib/resend';
import { EmailTemplate } from '@/emails/verificationsEmail';
import React from 'react';

export async function sendVerificationEmail(email: string, username: string, verifyCode: string): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['delivered@resend.dev'],
            subject: 'Hello world',
            react: React.createElement(EmailTemplate, { username, verifyCode }),
        });
        return {
            success: true,
            message: "Sent verification email succesfully"
        }
    } catch (error) {
        console.log("Error sending verification email: ", error)
        return {
            success: false,
            message: "Failed to send verification email"
        }
    }
}


