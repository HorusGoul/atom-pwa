export interface Element {
  atomic: number;
  symbol: string;
  name: string;
  atomicMass: string;
  cpkHexColor: string;
  electronicConfiguration: string;
  electronegativity: number;
  atomicRadius: number;
  ionRadius: string;
  vanDelWaalsRadius: number;
  ionizationEnergy: number;
  electronAffinity: number;
  oxidationStates: string;
  standardState: string;
  bondingType: string;
  meltingPoint: string;
  boilingPoint: string;
  density: number;
  group: string;
  yearDiscovered: number;
  valency: string;
  wrongValences: string[];
  testState: {
    valencesTest: boolean;
    ptTest: boolean;
  };
}
