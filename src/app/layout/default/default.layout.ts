import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Logo } from '../../components/logo/logo';

@Component({
  selector: 'app-default',
  imports: [RouterOutlet, Logo, RouterLink],
  templateUrl: './default.layout.html',
  styleUrl: './default.layout.css',
})
export class DefaultLayout {}
