import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) { }

    // JWT验证 - Step 2: 校验用户信息
    async validateUser(userName: string, password: string): Promise<any> {
        console.log('JWT验证 - Step 2: 校验用户信息');
        const user = await this.usersService.findByName(userName);
        if (user) {
            const hashedPassword = user.password;
            // 通过加密传参，再与数据库里的比较，判断是否相等
            if (hashedPassword === password) {
                // 密码正确
                return { code: 1, user };
            } else {
                // 密码错误
                return { code: 2, message: '密码错误' };
            }
        }
        // 查无此人
        return {
            code: 2,
            message: '该用户不存在',
        };
    }

    // JWT验证 - Step 3: 处理 jwt 签证
    async certificate(user: any) {
        const payload = { userName: user.userName, id: user.id };
        console.log('JWT验证 - Step 3: 处理 jwt 签证');
        try {
            const token = this.jwtService.sign(payload);
            return token;
        } catch (error) {
            return {
                code: 3,
                message: `账号或密码错误`,
            };
        }
    }
}