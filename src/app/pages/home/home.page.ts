import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { Artists } from './artists/artists';
import { Intro } from './intro/intro';

@Component({
  selector: 'app-home',
  imports: [Hero, Artists, Intro],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export default class HomePage {}
