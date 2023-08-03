import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.models';
import { JwtService } from "@nestjs/jwt";
import { BadRequestException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { Response } from "express";
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    private readonly jwtService: JwtService
    ) {}

  // REGISTRATION

  async registration(createUserDto: CreateUserDto, res: Response){
    const user = await this.userRepo.findOne({ where: { username: createUserDto.username } });

    if ( user ) {
      throw new BadRequestException("User already exists!");
    }

    if ( createUserDto.password !== createUserDto.confirm_password ) {
      throw new BadRequestException("Passwords not matched");
    }

    const hashed_password = await bcrypt.hash(createUserDto.password, 7);
    
    const newUser = await this.userRepo.create({
      ...createUserDto,
      hashed_password
    });

    const tokens = await this.getTokens(newUser);

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    const updatedUser = await this.userRepo.update({
      hashed_refresh_token: hashed_refresh_token
    },
    {
      where: { id: newUser.id },
      returning: true
    });
  
    res.cookie("refresh_token", tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true
    });
  }
  
  // GEtTOKENS

  async getTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      }),
      this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME
      })
    ]);
    return {
      accessToken,
      refreshToken
    }
  }

}
