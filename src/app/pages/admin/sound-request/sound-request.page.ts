import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import type { ColDef } from 'ag-grid-community';
import { SoundRequestService } from '../../../services/sound-request.service';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-sound-request',
  imports: [DatePipe, RouterLink],
  templateUrl: './sound-request.page.html',
  styleUrl: './sound-request.page.css'
})
export default class SoundRequestPage {
  protected readonly soundRequestService = inject(SoundRequestService)

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
    }
  ]
}
