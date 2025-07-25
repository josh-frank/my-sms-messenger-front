import {
  Component,
  OnInit,
  inject
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-message-display',
  imports: [],
  templateUrl: './message-display.html',
  styleUrl: './message-display.css'
})
export class MessageDisplay implements OnInit {

  private http = inject(HttpClient);
  private apiUrl = 'http://104.237.150.105/messages';
  private messages: string[] = [];

  getMessages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { params: { session_id: 'test' } } );
  }

  ngOnInit(): void {
    this.getMessages().subscribe( data => {
      this.messages = data;
    } );
  }

}
