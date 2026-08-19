export enum STATUS {
  NOTSTARTED = 'NOTSTARTED',
  INPROGRESS = 'INPROGRESS',
  COMPLETED = 'COMPLETED'
}



export interface dashboardSteps {
  id: string;
  title: string;
  description?: string;
  status: STATUS;
  icon?: string;
  color?: string;
  disabled: boolean;
}