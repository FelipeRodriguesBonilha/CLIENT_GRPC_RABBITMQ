import { Observable } from 'rxjs';
import { ReturnUser } from '../__dtos__/return-user.dto';
import { CreateUserDto } from '../__dtos__/create-user.dto';
import { UpdateUserDto } from '../__dtos__/update-user.dto';

export interface UserServiceGrpc {
    FindOne(data: { id: string }): Observable<ReturnUser>;
    CreateUser(data: CreateUserDto): Observable<ReturnUser>;
    FindAll(data: {}): Observable<{ users: ReturnUser[] }>;
    UpdateUser(data: UpdateUserDto): Observable<ReturnUser>;
    DeleteUser(data: { id: string }): Observable<{}>;
}