import { Component, inject, resource } from '@angular/core';
import { injectParams } from 'ngxtension/inject-params';
import { SoundRequestService } from '../../../../services/sound-request.service';
import { RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-sound-request-detail',
  imports: [RouterLink],
  templateUrl: './sound-request-detail.page.html',
  styleUrl: './sound-request-detail.page.css',
})
export default class SoundRequestDetailPage {
  private readonly soundRequestService = inject(SoundRequestService);
  private readonly soundRequestId = injectParams('soundRequestId');

  soundRequest$ = resource({
    params: () => this.soundRequestId(),
    loader: ({ params }) =>
      params
        ? this.soundRequestService.findById(params)
        : Promise.resolve(null),
  });

  updateStatus(status: '대기중' | '진행중' | '완료' | '취소됨') {
    const confirmed = confirm(
      `이 요청의 상태를 '${status}'(으)로 변경하시겠습니까?`,
    );
    if (!confirmed) {
      return;
    }
    const soundRequest = this.soundRequest$.value();
    if (!soundRequest) {
      return;
    }
    this.soundRequestService.updateStatus(soundRequest.id, status).then(() => {
      this.soundRequest$.reload();
      toast.success(`요청 상태가 '${status}'(으)로 변경되었습니다.`);
    });
  }
}
