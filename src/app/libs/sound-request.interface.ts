export interface SoundRequest {
  name: string;
  email: string;
  characterName: string;
  characterAge: number;
  characterCountry: string;
  characterLocation: string;
  description: string;
  image_path: string;
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
