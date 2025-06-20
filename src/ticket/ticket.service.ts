import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ReturnUser } from 'src/user/__dtos__/return-user.dto';

@Injectable()
export class TicketService {
    SERVER_API_URL = process.env.SERVER_API_URL;

    constructor(private readonly http: HttpService) { }

    placeUserInQueue(id: string): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(`${this.SERVER_API_URL}/ticket/${id}`, {}).pipe(map((res) => res.data));
    }

    getUsersInQueue(): Observable<ReturnUser[]> {
        return this.http.get<ReturnUser[]>(`${this.SERVER_API_URL}/ticket`).pipe(map((res) => res.data));
    }
}
