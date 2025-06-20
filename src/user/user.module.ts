import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5000',
          package: 'user',
          protoPath: join(process.cwd(), 'src/user/__protos__/user.proto'),
        },
      },
    ]),
  ],
})
export class UserModule { }