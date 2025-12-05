export interface SoundRequest {
  id: string;
  name: string;
  email: string;
  characterName: string;
  characterAge: number;
  characterCountry: string;
  characterLocation: string;
  description: string;
  image_path: string;
  created_at: Date;
  status: '대기중' | '진행중' | '완료' | '취소됨';
}

export interface CreateSoundRequest {
  name: string;
  email: string;
  characterName: string;
  characterAge: number;
  characterCountry: string;
  characterLocation: string;
  description: string;
  file: File;
}
