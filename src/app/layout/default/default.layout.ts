import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Logo } from '../../components/logo/logo';

@Component({
  selector: 'app-default',
  imports: [RouterOutlet, Logo],
  templateUrl: './default.layout.html',
  styleUrl: './default.layout.css',
})
export class DefaultLayout {}
