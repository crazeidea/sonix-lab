import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = new SupabaseClient(
      environment.supabaseUrl,
      environment.supabaseKey,
    );
  }

  getArtists() {
    return this.supabase
      .from('artist')
      .select()
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching artists:', error);
          return [];
        }
        return data;
      });
  }

  async createSoundRequest(req: {
    image: File;
    description: string;
    voice?: File;
  }) {
    const data: {
      description: string;
      image_path?: string;
      voice_path?: string;
    } = {
      description: req.description,
      image_path: undefined,
      voice_path: undefined,
    };

    const { data: image } = await this.supabase.storage
      .from('sound-request')
      .upload(
        `images/${crypto.randomUUID()}.${req.image.type.split('/')[1]}`,
        req.image,
      );

    if (image) {
      data.image_path = image.path;
    }
    if (req.voice) {
      const { data: voice } = await this.supabase.storage
        .from('sound-request')
        .upload(
          `voices/${crypto.randomUUID()}.${req.voice.type.split('/')[1]}`,
          req.voice,
        );
      if (voice) {
        data.voice_path = voice.path;
      }
    }

    return this.supabase.from('sound_request').insert([data]);
  }
}
