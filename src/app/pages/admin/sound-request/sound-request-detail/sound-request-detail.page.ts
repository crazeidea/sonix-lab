import { Component, inject, resource } from '@angular/core';
import {injectParams} from 'ngxtension/inject-params'
import { SoundRequestService } from '../../../../services/sound-request.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-sound-request-detail',
  imports: [RouterLink],
  templateUrl: './sound-request-detail.page.html',
  styleUrl: './sound-request-detail.page.css'
})
export default class SoundRequestDetailPage {
  private readonly soundRequestService = inject(SoundRequestService)
  private readonly soundRequestId = injectParams('soundRequestId')

  soundRequest$ = resource({
    params: () => this.soundRequestId(),
    loader: ({params}) => params ? this.soundRequestService.findById(params) : Promise.resolve(null)
  })

}
