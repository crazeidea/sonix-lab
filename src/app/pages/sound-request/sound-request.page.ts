import { AsyncPipe } from '@angular/common';
import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { startWith } from 'rxjs';
import { SwiperContainer } from 'swiper/element';
import { Logo } from '../../components/logo/logo';
import { DataUrlPipe } from '../../pipes/data-url.pipe';
import { SupabaseService } from '../../services/supabase.service';
import { Router } from '@angular/router';
import { SoundRequestService } from '../../services/sound-request.service';

@Component({
  selector: 'app-sound-request',
  imports: [DataUrlPipe, AsyncPipe, FormsModule, ReactiveFormsModule, Logo],
  templateUrl: './sound-request.page.html',
  styleUrl: './sound-request.page.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class SoundRequestPage {
  private readonly soundRequestService = inject(SoundRequestService);
  private readonly router = inject(Router);

  private readonly completeModalRef =
    viewChild.required<ElementRef<HTMLDialogElement>>('completeModal');

  form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    characterName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    characterAge: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0)],
    }),
    characterCountry: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    characterLocation: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    photo: new FormControl<File | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  formValue$ = toSignal(
    this.form.valueChanges.pipe(startWith(this.form.value)),
  );

  page1Valid = computed(() => {
    this.formValue$();
    const controls = [
      'name',
      'email',
      'characterName',
      'characterAge',
      'characterCountry',
      'characterLocation',
    ];
    return controls.every((controlName) => this.form.get(controlName)?.valid);
  });

  page2Valid = computed(() => {
    this.formValue$();
    return this.form.get('photo')?.valid ?? false;
  });

  page3Valid = computed(() => {
    this.formValue$();
    return this.form.get('description')?.valid ?? false;
  });

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.item(0) ?? null;
    this.form.controls.photo.setValue(file);
  }

  async submit() {
    const value = this.form.getRawValue();

    await this.soundRequestService.create({
      name: value.name,
      email: value.email,
      characterName: value.characterName,
      characterAge: value.characterAge!,
      characterCountry: value.characterCountry,
      characterLocation: value.characterLocation,
      description: value.description,
      file: value.photo!,
    });

    this.completeModalRef().nativeElement.showModal();
  }

  closeTicket() {
    this.completeModalRef().nativeElement.close();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
