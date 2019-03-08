import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExceptionHandlerService {

  public listen: Subject<string> = null;

  constructor() {
    this.listen = new Subject<string>();
  }

  public throwError(msg: string): void {
    this.listen.next(msg);
  }
}
