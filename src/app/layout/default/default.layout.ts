import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-default',
  imports: [RouterOutlet],
  templateUrl: './default.layout.html',
  styleUrl: './default.layout.css',
})
export class DefaultLayout {}
