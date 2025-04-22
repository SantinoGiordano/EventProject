export interface Schedule {
  _id: string;
  name: string;
  time: Date;
  status: boolean;
  location?: string;
  price?: number;
}
