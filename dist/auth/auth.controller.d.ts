import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    private logger;
    constructor(authService: AuthService);
    register(regesterDto: RegisterDto): Promise<import("../user/entities/user.entity").User>;
    login(loginDto: LoginDto): Promise<{
        data: import("../user/entities/user.entity").User;
        access_token: string;
    }>;
}
