export type Schedule ={
  _id: string,
  name: string;
  status: boolean;
  time?: Date;
  location?: string;
  price?: number;
  type: string;
};
