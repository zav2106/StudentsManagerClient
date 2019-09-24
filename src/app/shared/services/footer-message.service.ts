import { Injectable } from '@angular/core';
import { FooterMessageLevel } from '../models/footer-message-level.enum';
import { FooterMessage } from '../models/footer-message';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterMessageService {

  private messageSubject = new Subject<FooterMessage>();

  public get messages(): Observable<FooterMessage> {
    return this.messageSubject.asObservable();
  }

  public pushMessage(message: FooterMessage) {
    this.messageSubject.next(message);
  }

  public pushInfo(text: string) {
    this.pushMessage({text, level: FooterMessageLevel.info});
  }

  public pushError(error: any) {
    const text = this.extractErrorText(error);
    if (text) {
      this.pushMessage({text, level: FooterMessageLevel.error});
    }
  }

  private extractErrorText(err: string|Error|any|any[]): string {
    if (typeof err === 'string') {
      return err;
    }
    if (err.error) {
      return this.extractErrorText(err.error);
    }
    if (err instanceof Error || typeof err.message === 'string') {
      return err.message;
    }
    if (Array.isArray(err) && err.length) {
      return this.extractErrorText(err[0]);
    }
    console.warn('FooterMessageService.extractErrorText: unknown error object structure. err=', err);
    return 'Обнаружена неизвестная ошибка сервера.';
  }
}
