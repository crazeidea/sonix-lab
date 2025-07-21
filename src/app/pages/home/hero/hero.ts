import { Component } from '@angular/core';
import { HeroBg } from './hero-bg/hero-bg';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  imports: [HeroBg],
})
export class Hero {}
