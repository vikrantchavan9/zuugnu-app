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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const pg_1 = require("pg");
let AuthService = AuthService_1 = class AuthService {
    constructor(pool, jwtService) {
        this.pool = pool;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async login(phone, plainPassword) {
        const normalizedPhone = phone.replace(/\D/g, '');
        this.logger.log(`Attempting login for phone: ${normalizedPhone}`);
        let user;
        try {
            const query = `
        SELECT id, phone, name, password_plain 
        FROM users 
        WHERE phone = $1
      `;
            const result = await this.pool.query(query, [normalizedPhone]);
            user = result.rows[0];
        }
        catch (error) {
            this.logger.error('CRITICAL: Database connection or query failed', error);
            throw new common_1.InternalServerErrorException('Database error. Check backend terminal.');
        }
        if (!user) {
            this.logger.warn(`Login Failed: User not found for phone ${normalizedPhone}`);
            throw new common_1.HttpException('Invalid phone number or password', common_1.HttpStatus.UNAUTHORIZED);
        }
        if (plainPassword !== user.password_plain) {
            this.logger.warn(`Login Failed: Password mismatch for phone ${normalizedPhone}`);
            throw new common_1.HttpException('Invalid phone number or password', common_1.HttpStatus.UNAUTHORIZED);
        }
        this.logger.log(`Login successful for: ${normalizedPhone}`);
        const payload = { sub: user.id, phone: user.phone, name: user.name };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                name: user.name,
                phone: user.phone
            }
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DATABASE_CONNECTION')),
    __metadata("design:paramtypes", [pg_1.Pool,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map