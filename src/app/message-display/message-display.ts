import {
  Component,
  OnInit,
  inject
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

interface MessageResponse { _id: string, to: string, content: string, session_id: string, created_at: string, updated_at: string, }

@Component({
  selector: 'app-message-display',
  imports: [
    CommonModule,
  ],
  providers: [
    CookieService,
  ],
  templateUrl: './message-display.html',
  styleUrl: './message-display.css'
})
export class MessageDisplay implements OnInit {

  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  private apiUrl = 'http://104.237.150.105/messages';
  messages: MessageResponse[] = [];

  getMessages( session_id: string ): Observable<MessageResponse[]> {
    return this.http.get<MessageResponse[]>(this.apiUrl, { params: { session_id } } );
  }

  ngOnInit(): void {
    // this.getSessionIdFromCookies = this.cookieService.get( 'session_id' );
    this.getMessages( this.cookieService.get( 'session_id' ) ).subscribe( data => {
      this.messages = data;
      // console.log( this.messages );
    } );
  }

}
