import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(user: User): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
