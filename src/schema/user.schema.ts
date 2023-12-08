import { TypeOf, object, string } from "zod";

//obiekt potrzebny do walidacji w routerze jako middleware oraz controllera
// "body" jako nazwa ma być spójne z nazwą użytą w schema.parse (validate) oraz w paramtrach controllera CreateUserInput["body"]
export const createUserSchema = object({
    body: object({
        name: string({ required_error: 'Name is required' }),
        password: string({ required_error: 'Password is required' }).min(6, 'Password to short- should be 6 chars minimum'),
        passwordConfirmation: string({ required_error: 'passwordconfirmation is required' }),
        email: string({ required_error: 'Email is required' }).email('Not a valid email'),
    }).refine((data) => data.password === data.passwordConfirmation, 
    {
        message: 'Password do not match',
        path: ['passwordConfirmation']
    })
});

/* Parametr path jest używany do określenia, które pole lub pola w obiekcie danych spowodowały naruszenie reguły walidacji. 
W tym przypadku, jeśli potwierdzenie hasła nie jest zgodne z hasłem, to pole passwordconfirmation jest ustawiane jako ścieżka do tego błędu. 
Oznacza to, że informacja o błędzie zostanie przypisana do tego konkretnego pola w obiekcie wynikowym, aby wskazać, które pole jest problematyczne. */


// typ CreateUserInput potrzebny do wyłaczenia "passwordConfirmation" z zapisu do DB (wyłaczenie w controlelrze i serwisie- bo w serwisie przenosimy całe req.body z cotrollera)
//porzebny do przekazania do controllera

export const verifyUserSchema = object({
    params: object({
        id: string({ required_error: 'ID is required' }),
        verificationCode: string({ required_error: 'Verification code is required' })
    })
});

export const forgotPasswordUserSchema = object({
    body: object({
        email: string({ required_error: 'Email is required' }).email('Not a valid email')
    })
});


export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["params"];
export type ForgotPasswordUserInput = TypeOf<typeof forgotPasswordUserSchema>["body"];
export type CreateUserInput = Omit<
TypeOf<typeof createUserSchema>,
"body.passwordConfirmation">["body"];

