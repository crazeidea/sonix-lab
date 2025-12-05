import { Component, inject } from '@angular/core';
import { SoundRequestService } from '../../../services/sound-request.service';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css'
})
export default class HomePage {

  protected readonly soundRequestService = inject(SoundRequestService)

  

}
