import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateUserDto } from './__dtos__/create-user.dto';
import { ReturnUser } from './__dtos__/return-user.dto';
import { UpdateUserDto } from './__dtos__/update-user.dto';
import { UserServiceGrpc } from './__interfaces__/user-service-grpc.interface';

@Injectable()
export class UserService implements OnModuleInit {
    private grpcService!: UserServiceGrpc;

    constructor(
        @Inject('USER_PACKAGE') private readonly client: ClientGrpc
    ) { }

    onModuleInit(): void {
        this.grpcService = this.client.getService<UserServiceGrpc>('UserService');
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