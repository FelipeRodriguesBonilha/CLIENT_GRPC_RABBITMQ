import { Observable } from "rxjs";
import { ReturnUser } from "src/user/__dtos__/return-user.dto";

export interface TicketServiceGrpc {
    PlaceUserInQueue(data: { id: string }): Observable<{ message: string }>;
    GetUsersInQueue(data: {}): Observable<{ users: ReturnUser[] }>;
}