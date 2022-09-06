import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private logger;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(data: RegisterDto): Promise<User>;
    login(data: LoginDto): Promise<{
        data: User;
        access_token: string;
    }>;
    findOne(id: number): Promise<User>;
}
