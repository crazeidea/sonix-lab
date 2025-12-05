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
