import {Component, OnDestroy, OnInit} from '@angular/core';
import {Unsubscribable} from 'rxjs';
import {FooterMessageService} from '../../services/footer-message.service';
import {FooterMessageLevel} from '../../models/footer-message-level.enum';
import {FooterMessage} from '../../models/footer-message';

@Component({
  selector: 'app-footer-message',
  templateUrl: './footer-message.component.html',
  styleUrls: ['./footer-message.component.scss']
})
export class FooterMessageComponent implements OnInit, OnDestroy {
  FooterMessageLevel = FooterMessageLevel; // to see it into the template

  text: string = '';
  level: FooterMessageLevel = FooterMessageLevel.info;
  subscription: Unsubscribable = null;

  constructor(private service: FooterMessageService) {
    if (!this.subscription) {
      this.subscription = this.service.messages.subscribe((message: FooterMessage) => {
        this.text = message.text;
        this.level = message.level;
        setTimeout(() => this.close(), 5000);
      });
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  close() {
    this.text = '';
  }

}
