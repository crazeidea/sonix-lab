import { afterNextRender, Component } from '@angular/core';
import { Hero } from './hero/hero';
import { Artists } from './artists/artists';
import { Intro } from './intro/intro';
import { fromEvent, throttleTime } from 'rxjs';
import { Exhibition } from './exhibition/exhibition/exhibition';

@Component({
  selector: 'app-home',
  imports: [Hero, Artists, Intro, Exhibition],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export default class HomePage {}
