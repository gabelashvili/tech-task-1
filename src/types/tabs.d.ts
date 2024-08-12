export type ITabLevel = { id: number; name: string };

export interface ITab {
  name: string;
  name_eng: string;
  is_archive: boolean;
  document_level_id: number;
  valide_period: string;
  confirm_date: string;
  createdAt: Date;
  updatedAt: Date;
  name_code: string;
  id: number;
}
