import { Controller, Get, Param, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
    constructor(
        private readonly ticketService: TicketService
    ) { }

    @Post('place-user-in-queue/:id')
    placeUserInQueue(@Param('id') id: string) {
        return this.ticketService.placeUserInQueue(id);
    }

    @Get('users-in-queue')
    getUsersInQueue() {
        return this.ticketService.getUsersInQueue();
    }
}
