export interface IGadget {
  name: string;
  price: number;
  quantity: number;
  brand: string;
  model: string;
  category: string;
  operatingSystem: string;
  connectivity: string;
  powerSource: string;
  features: string | string[];
}
