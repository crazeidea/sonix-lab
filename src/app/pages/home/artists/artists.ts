import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-artists',
  imports: [],
  templateUrl: './artists.html',
  styleUrl: './artists.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  host: {
    ngSkipHydration: 'true',
  },
})
export class Artists {
  artists: {
    name: string;
    role: string;
    instagram: string;
  }[] = [
    {
      name: '김현진',
      role: '기획 및 연출',
      instagram: 'bbub_bbub',
    },
    {
      name: '류선경',
      role: '사운드 디자이너',
      instagram: 'i____eyre',
    },
    {
      name: '문정인',
      role: '총괄',
      instagram: 'm0_0ndal12',
    },
    {
      name: '오여민',
      role: '인터렉션 디자이너',
      instagram: 'dosek_yeomin5',
    },
    {
      name: '이윤서',
      role: '비주얼 디렉터',
      instagram: 'lyseo_mt',
    },
  ];
}
