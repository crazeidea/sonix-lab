import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import type { ColDef } from 'ag-grid-community';
import { SoundRequestService } from '../../../services/sound-request.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-sound-request',
  imports: [DatePipe, RouterLink, FormsModule],
  templateUrl: './sound-request.page.html',
  styleUrl: './sound-request.page.css',
})
export default class SoundRequestPage {
  protected readonly soundRequestService = inject(SoundRequestService);

  query = signal('');

  protected readonly soundRequests = computed(() => {
    const query = this.query();
    return this.soundRequestService.soundRequests$
      .value()
      .filter(
        (request) =>
          request.name.includes(query) ||
          request.email.includes(query) ||
          request.status.includes(query),
      );
  });

  columns: ColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
    },
    {
      field: 'name',
      headerName: '이름 / 텀블벅 아이디',
    },
    {
      field: 'created_at',
      headerName: '등록일',
    },
  ];
}
