import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  resource,
  viewChild,
} from '@angular/core';

import { SupabaseService } from '../../../services/supabase.service';
import { Artists } from './artists.const';
import { SwiperOptions } from 'swiper/types';
import { SwiperContainer } from 'swiper/element';

@Component({
  selector: 'app-artists',
  imports: [],
  templateUrl: './artists.html',
  styleUrl: './artists.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ArtistsSection implements AfterViewInit {

  swiperContainerRef = viewChild.required<ElementRef<SwiperContainer>>('swiperContainer');

  artists = Artists;

  getArtist(name: string) {
    return this.artists.find((artist) => artist.name === name);
  }

  swiperOptions: SwiperOptions = {
    slidesPerView: 1.5,
    spaceBetween:16,
    breakpoints: {
      640: {
        slidesPerView: 3.5,
      },
   
    }
  }

  ngAfterViewInit(): void {
    const swiperContainer = document.querySelector('swiper-container')
    if (!swiperContainer) return;
    Object.assign(swiperContainer, this.swiperOptions)
    swiperContainer.initialize()
  }
}
