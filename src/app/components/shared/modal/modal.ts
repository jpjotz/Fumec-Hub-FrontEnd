import { Component, output, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-modal',
  styleUrl: './modal.css',
  templateUrl: './modal.html',
})
export class Modal {

  close = output<void>();

  title = input<string>();
}
