export interface ProcessStep {
  id: string;
  title: string;
  description?: string;
  status: STATUS;
  icon?: string;
  color?: string;
  disabled: boolean;
}

export interface Step {
  id?: string;
  title: string;
  description?: string;
  status: STATUS;
  icon?: string;
  color?: string;
}

export enum STATUS {
  NOTSTARTED = 'NOTSTARTED',
  INPROGRESS = 'INPROGRESS',
  COMPLETED = 'COMPLETED'
}