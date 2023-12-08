import {object , string} from 'zod';

const createSessionSchema = object({
    body: object({
        email: string({ required_error: 'Email required'}),
        password: string({required_error: 'Password is required'})
    })
});

export default createSessionSchema;