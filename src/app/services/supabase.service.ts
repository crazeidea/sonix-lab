import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import {
  CreateSoundRequest,
  SoundRequest,
} from '../libs/sound-request.interface';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = new SupabaseClient(
      environment.supabaseUrl,
      environment.supabaseKey,
    );
  }

  async createSoundRequest(req: CreateSoundRequest) {
    const data: SoundRequest = {
      name: req.name,
      email: req.email,
      characterName: req.characterName,
      characterAge: req.characterAge,
      characterCountry: req.characterCountry,
      characterLocation: req.characterLocation,
      description: req.description,
      image_path: '',
    };

    const { data: image } = await this.supabase.storage
      .from('sound-request')
      .upload(
        `images/${crypto.randomUUID()}.${req.file.type.split('/')[1]}`,
        req.file,
      );

    if (image) {
      data.image_path = image.path;
    }

    await this.supabase.from('sound_request').insert([data]);

    return data;
  }
}
