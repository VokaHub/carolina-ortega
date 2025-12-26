
export type FeelingOption = 
  | 'Ansiedad' 
  | 'Tristeza o desmotivación' 
  | 'Enojo o irritabilidad' 
  | 'Estrés constante' 
  | 'No estoy segura/o';

export interface FormData {
  email: string;
  feeling: FeelingOption;
}
