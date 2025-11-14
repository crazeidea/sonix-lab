import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  resource,
  viewChild,
} from '@angular/core';

import { register, SwiperContainer } from 'swiper/element/bundle';
import { Artists } from '../../../libs/artists.const';
import { SupabaseService } from '../../../services/supabase.service';
register();

@Component({
  selector: 'app-artists',
  imports: [],
  templateUrl: './artists.html',
  styleUrl: './artists.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    ngSkipHydration: 'true',
  },
})
export class ArtistsSection {
  swiperRef = viewChild<ElementRef<SwiperContainer>>('swiperRef');
  private readonly supabaseService = inject(SupabaseService);

  artists = resource({
    loader: () => this.supabaseService.getArtists(),
    defaultValue: [],
  });

  getArtist(name: string) {
    return this.artists.value().find((artist) => artist.name === name);
  }
}
