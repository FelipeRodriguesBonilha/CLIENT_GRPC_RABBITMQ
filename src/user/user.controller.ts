import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './__dtos__/create-user.dto';
import { Observable } from 'rxjs';
import { ReturnUser } from './__dtos__/return-user.dto';
import { UpdateUserDto } from './__dtos__/update-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    findAll(): Observable<{ users: ReturnUser[] }> {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<ReturnUser> {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto): Observable<ReturnUser> {
        return this.userService.create(createUserDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: Omit<UpdateUserDto, 'id'>): Observable<ReturnUser> {
        return this.userService.update({id, ...updateUserDto});
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<{}> {
        return this.userService.delete(id);
    }
}