interface CarUtil {
  partName: string;
  runDiagnostics(): string;
}
interface CarBody extends CarUtil {
  material: string;
  state: string;
}
interface Tires extends CarUtil {
  airPressure: number;
  condition: string;
}
interface Engine extends CarUtil {
  horsepower: number;
  oilDensity: number;
}
function runDiagnostics(this: CarUtil): string {
  return this.partName;
}
function carDiagnostics(carBody: CarBody, tires: Tires, engine: Engine) {
  console.log(carBody.runDiagnostics()); // Log "Car Body"
  console.log(tires.runDiagnostics()); // Log "Tires"
  console.log(engine.runDiagnostics()); // Log "Engine"
  //TODO: ALABALA ALA BALA
}
carDiagnostics(
  { material: 'aluminum', state: 'scratched', partName: 'Car Body', runDiagnostics },
  { airPressure: 30, condition: 'needs change', partName: 'Tires', runDiagnostics },
  { horsepower: 300, oilDensity: 780, partName: 'Engine', runDiagnostics }
);
