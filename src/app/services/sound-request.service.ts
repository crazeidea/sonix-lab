import { computed, inject, Injectable, resource } from '@angular/core';
import { SupabaseService } from './supabase.service';
import {
  CreateSoundRequest,
  SoundRequest,
} from '../libs/sound-request.interface';

@Injectable({ providedIn: 'root' })
export class SoundRequestService {
  private readonly supabaseService = inject(SupabaseService);

  soundRequests$ = resource<SoundRequest[], any>({
    loader: () =>
      this.supabaseService.supabase
        .from('sound_request')
        .select('*')
        .then((res) => res.data as SoundRequest[]),
    defaultValue: [],
  });

  pendingSoundRequests = computed(() =>
    this.soundRequests$.value().filter((req) => req.status === '대기중'),
  );

  processingSoundRequests = computed(() =>
    this.soundRequests$.value().filter((req) => req.status === '진행중'),
  );

  completedSoundRequests = computed(() =>
    this.soundRequests$.value().filter((req) => req.status === '완료'),
  );

  cancelledSoundRequests = computed(() =>
    this.soundRequests$.value().filter((req) => req.status === '취소됨'),
  );

  async findById(id: string): Promise<SoundRequest> {
    const { data } = await this.supabaseService.supabase
      .from('sound_request')
      .select('*')
      .eq('id', id);

    if (data) {
      return data.at(0) as SoundRequest;
    }

    throw new Error('Sound request not found');
  }

  async create(req: CreateSoundRequest) {
    const data: Omit<CreateSoundRequest, 'file'> & { image_path: string } = {
      name: req.name,
      email: req.email,
      characterName: req.characterName,
      characterAge: req.characterAge,
      characterCountry: req.characterCountry,
      characterLocation: req.characterLocation,
      description: req.description,
      image_path: '',
    };

    const { data: image } = await this.supabaseService.supabase.storage
      .from('sound-request')
      .upload(
        `images/${crypto.randomUUID()}.${req.file.type.split('/')[1]}`,
        req.file,
      );

    if (image) {
      data.image_path = `https://gimbbfiberrxqmlulbsy.supabase.co/storage/v1/object/public/${image.fullPath}`;
    }

    await this.supabaseService.supabase.from('sound_request').insert([data]);

    return data;
  }

  async updateStatus(
    id: string,
    status: '대기중' | '진행중' | '완료' | '취소됨',
  ) {
    await this.supabaseService.supabase
      .from('sound_request')
      .update({ status })
      .eq('id', id);
  }
}
