import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WhatsAppLink } from '../../contact';
import { PensilPosHighlight } from '../../products';
import { DeliveryProcess, SERVICE_OFFERINGS, ServiceCard } from '../../services';
import { Icon } from '../../shared/ui/icon';
import { SectionHeading } from '../../shared/ui/section-heading';
import { FREQUENT_QUESTIONS, PROMISES } from './home.content';
import { SketchToProduct } from './sketch-to-product';

@Component({
  selector: 'app-home-page',
  imports: [
    DeliveryProcess,
    Icon,
    PensilPosHighlight,
    RouterLink,
    SectionHeading,
    ServiceCard,
    SketchToProduct,
    WhatsAppLink,
  ],
  templateUrl: './home-page.html',
})
export class HomePage {
  protected readonly promises = PROMISES;
  protected readonly offerings = SERVICE_OFFERINGS;
  protected readonly questions = FREQUENT_QUESTIONS;
}
