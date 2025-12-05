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
import { Artists } from '../../../libs/artists.const';

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
  artists = Artists;

  getArtist(name: string) {
    return this.artists.find((artist) => artist.name === name);
  }
}
