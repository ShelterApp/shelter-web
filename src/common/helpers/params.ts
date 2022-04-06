export interface Params {
  id: number;
}

export interface Match<Params> {
  params: Params;
  isExact: boolean;
  path: string;
  url: string;
}
