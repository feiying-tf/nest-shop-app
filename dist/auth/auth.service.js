"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger('AuthService');
    }
    async register(data) {
        const { mobile, password } = data;
        const found = await this.userRepository.findOneBy({
            mobile,
        });
        if (found) {
            throw new common_1.InternalServerErrorException('用户已存在');
        }
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        const user = await this.userRepository.create({
            mobile,
            password: hash,
        });
        user.createAt = new Date();
        user.updateAt = new Date();
        try {
            const result = await this.userRepository.save(user);
            return result;
        }
        catch (error) {
            this.logger.error(`Failed to register user: ${JSON.stringify(user)}`, error.stack);
            throw new common_1.InternalServerErrorException('注册失败');
        }
    }
    async login(data) {
        const { mobile, password } = data;
        const found = await this.userRepository.findOneBy({
            mobile,
        });
        console.log('found', found);
        if (!found) {
            throw new common_1.InternalServerErrorException('用户不存在');
        }
        const { password: hash, id } = found;
        const isMatch = await bcrypt.compare(password, hash);
        if (!isMatch) {
            throw new common_1.InternalServerErrorException('账号或密码错误');
        }
        const payload = {
            id,
        };
        return {
            data: found,
            access_token: this.jwtService.sign(payload),
        };
    }
    async findOne(id) {
        return await this.userRepository.findOneBy({ id });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map