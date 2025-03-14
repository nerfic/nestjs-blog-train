
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async findOne(email: string) {
        return this.prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    async create(email: string, username: string, password: string) {
        try {
            return await this.prisma.user.create({
                data: {
                    email,
                    username,
                    password,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });
        } catch (error) {
            throw new BadRequestException();
        }
    }
}
