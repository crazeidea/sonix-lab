import {
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-sand-in-your-eyes',
  imports: [],
  templateUrl: './sand-in-your-eyes.page.html',
  styleUrl: './sand-in-your-eyes.page.css',
})
export default class SandInYourEyesPage {
  soundRequestDialog =
    viewChild.required<ElementRef<HTMLDialogElement>>('soundRequestDialog');
  private readonly supabaseService = inject(SupabaseService);

  submitting = signal(false);

  async submitSoundRequest(description: string, image?: File, voice?: File) {
    if (!image) return;

    this.submitting.set(true);

    await this.supabaseService.createSoundRequest({
      image,
      description,
      voice,
    });

    this.submitting.set(false);

    this.soundRequestDialog().nativeElement.close();
  }
}
