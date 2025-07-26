import {
  Component,
  OnInit,
  inject
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-message-form',
  imports: [],
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

  sendMessage( session_id: string ): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl, {
    } );
  }

  ngOnInit(): void {}

}
