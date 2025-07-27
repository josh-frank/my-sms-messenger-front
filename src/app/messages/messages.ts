import {
  Component,
  OnInit,
  inject
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl
} from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { MessageResponse } from '../message-response';

@Component({
  selector: 'app-messages',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    CookieService,
  ],
  templateUrl: './messages.html',
  styleUrl: './messages.css'
})
export class Messages implements OnInit {

  private http = inject(HttpClient);
  private apiUrl = 'http://104.237.150.105/messages';

  private cookieService = inject(CookieService);
  getSessionID = this.cookieService.get( 'session_id' );

  messages: MessageResponse[] = [];

  messageForm = new FormGroup({
    to: new FormControl(''),
    content: new FormControl(''),
  });

  // constructor() {}

  getMessages( session_id: string ): Observable<MessageResponse[]> {
    return this.http.get<MessageResponse[]>( this.apiUrl, { params: { session_id } } );
  }

  sendMessage( session_id: string ): Observable<MessageResponse[]> {
    return this.http.post<MessageResponse[]>( this.apiUrl, {
      session_id,
      to: this.messageForm.value.to,
      content: this.messageForm.value.content,
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    } );
  }

  onSubmit(): void {
    this.sendMessage( this.getSessionID ).subscribe( data => {
      this.messages = data;
      window.alert( 'Message sent!' )
    } );
  }

  ngOnInit(): void {
    this.getMessages( this.getSessionID ).subscribe( data => {
      this.messages = data;
      console.log( 'this.messages loaded: ' + JSON.stringify( this.messages ) );
    } );
  }

}
