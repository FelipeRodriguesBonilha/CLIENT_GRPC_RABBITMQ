import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { TicketServiceGrpc } from './__interfaces__/ticket-service-grpc.interface';
import { Observable } from 'rxjs';
import { ReturnUser } from 'src/user/__dtos__/return-user.dto';

@Injectable()
export class TicketService {
    private ticketService: TicketServiceGrpc;

    constructor(@Inject('TICKET_PACKAGE') private client: ClientGrpc) { }

    onModuleInit() {
        this.ticketService = this.client.getService<TicketServiceGrpc>('TicketService');
    }

    placeUserInQueue(id: string): Observable<{message: string}> {
        return this.ticketService.PlaceUserInQueue({ id });
    }

    getUsersInQueue(): Observable<{ users: ReturnUser[] }> {
        return this.ticketService.GetUsersInQueue({});
    }
}
