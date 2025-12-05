import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.svg',
  styles: `
    svg {
      width: auto;
      height: 100%;
      color: currentColor
    }
  `,
})
export class Logo {}
