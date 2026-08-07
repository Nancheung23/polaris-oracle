import type { Gender } from "@/lib/constants/gender";
import type { Shichen } from "@/lib/constants/shichen";

export interface ReadingFormData {
  name: string;
  gender: Gender | undefined;
  birthDate: string; 
  shichen: Shichen | undefined;
  location: string;
}