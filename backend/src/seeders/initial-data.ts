import { Aceite } from '../entities/aceite.entity';
import { Gasolina } from '../entities/gasolina.entity';
import { Parametros } from '../entities/parametros.entity';

export const initialAceites: Partial<Aceite>[] = [
  {
    nombre: 'Crudo Ligero',
    octanaje: 95.5,
    plomo: 0.5,
    costo: 0.85,
    capacidad: 500000,
  },
  {
    nombre: 'Crudo Medio',
    octanaje: 87.2,
    plomo: 2.1,
    costo: 0.72,
    capacidad: 750000,
  },
  {
    nombre: 'Crudo Pesado',
    octanaje: 82.8,
    plomo: 5.3,
    costo: 0.65,
    capacidad: 600000,
  },
  {
    nombre: 'Crudo Premium',
    octanaje: 98.1,
    plomo: 0.2,
    costo: 1.15,
    capacidad: 300000,
  },
];

export const initialGasolinas: Partial<Gasolina>[] = [
  {
    nombre: 'Súper',
    demanda: 400000,
    precio: 1.25,
    octanajeMinimo: 95,
    plomoMaximo: 1.0,
  },
  {
    nombre: 'Regular',
    demanda: 600000,
    precio: 1.15,
    octanajeMinimo: 87,
    plomoMaximo: 2.5,
  },
  {
    nombre: 'Diésel',
    demanda: 300000,
    precio: 1.05,
    octanajeMinimo: 80,
    plomoMaximo: 5.0,
  },
];

export const initialParametros: Partial<Parametros> = {
  costoFijoPorLitro: 0.5,
  produccionMaximaTotal: 1500000,
  penalizacionProduccionExtra: 1.5,
  permitirProduccionExtra: true,
}; 