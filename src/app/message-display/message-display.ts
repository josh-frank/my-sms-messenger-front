import {
  Component,
  OnInit,
  inject
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-message-display',
  imports: [],
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
  private messages: string[] = [];

  getMessages( session_id: string ): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { params: { session_id } } );
  }

  ngOnInit(): void {
    // this.getSessionIdFromCookies = this.cookieService.get( 'session_id' );
    this.getMessages( this.cookieService.get( 'session_id' ) ).subscribe( data => {
      this.messages = data;
      console.log( this.messages );
    } );
  }

}
