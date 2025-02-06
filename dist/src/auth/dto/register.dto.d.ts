export declare class RegisterDto {
    email: string;
    password: string;
    role: 'user' | 'admin';
    constructor(email: string, password: string, role: 'user' | 'admin');
}
