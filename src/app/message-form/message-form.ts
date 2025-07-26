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
  selector: 'app-message-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    CookieService,
  ],
  templateUrl: './message-form.html',
  styleUrl: './message-form.css'
})
export class MessageForm implements OnInit {

  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  private apiUrl = 'http://104.237.150.105/messages';

  messageForm = new FormGroup({
    to: new FormControl(''),
    content: new FormControl(''),
  });

  sendMessage( session_id: string ): Observable<MessageResponse[]> {
    return this.http.post<MessageResponse[]>(this.apiUrl, {
      session_id,
      to: this.messageForm.value.to,
      content: this.messageForm.value.content,
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    } );
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.sendMessage( this.cookieService.get( 'session_id' ) ).subscribe( ( /* data */ ) => {
      // console.log( data )
      window.alert( 'Message sent!' )
    } );
  }

}
