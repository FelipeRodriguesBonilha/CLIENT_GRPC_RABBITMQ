import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { UserServiceClient } from './__interfaces__/user-service-client.interface';
import { ReturnUser } from './__dtos__/return-user.dto';
import { CreateUserDto } from './__dtos__/create-user.dto';
import { Observable } from 'rxjs';
import { UpdateUserDto } from './__dtos__/update-user.dto';

@Injectable()
export class UserService implements OnModuleInit {
    private grpcService!: UserServiceClient;

    constructor(
        @Inject('USER_PACKAGE') private readonly client: ClientGrpc
    ) { }

    onModuleInit(): void {
        this.grpcService = this.client.getService<UserServiceClient>('UserService');
    }

    findOne(id: string): Observable<ReturnUser> {
        return this.grpcService.FindOne({ id });
    }

    findAll(): Observable<{ users: ReturnUser[] }> {
        return this.grpcService.FindAll({});
    }

    create(data: CreateUserDto): Observable<ReturnUser> {
        return this.grpcService.CreateUser(data);
    }

    update(data: UpdateUserDto): Observable<ReturnUser> {
        return this.grpcService.UpdateUser(data);
    }

    delete(id: string): Observable<{}> {
        return this.grpcService.DeleteUser({ id });
    }
}