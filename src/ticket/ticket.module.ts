import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { HttpModule } from '@nestjs/axios';
import { join } from 'path';

@Module({
  controllers: [TicketController],
  providers: [TicketService],
  imports: [
    ClientsModule.register([
      {
        name: 'TICKET_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'users_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ClientsModule.register([
      {
        name: 'TICKET_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:6000',
          package: 'ticket',
          protoPath: join(process.cwd(), 'src/ticket/__protos__/ticket.proto'),
        },
      },
    ]),
  ]
})
export class TicketModule { }
