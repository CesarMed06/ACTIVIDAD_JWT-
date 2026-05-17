const mongoose = require('mongoose');
const Equipo = require('../models/Equipo');
const Jugador = require('../models/Jugador');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/futbol_test');
  await Equipo.deleteMany({});
  await Jugador.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Modelo Equipo', () => {
  test('Crear equipo válido', async () => {
    const equipo = new Equipo({ nombre: 'Madrid', ciudad: 'Madrid', añoFundacion: 1902, categoria: 'Primera' });
    const guardado = await equipo.save();
    expect(guardado.nombre).toBe('Madrid');
  });

  test('Error si nombre es corto', async () => {
    const equipo = new Equipo({ nombre: 'AB', categoria: 'Primera' });
    await expect(equipo.save()).rejects.toThrow();
  });

  test('Error si añoFundacion es muy bajo', async () => {
    const equipo = new Equipo({ nombre: 'Test', añoFundacion: 1800, categoria: 'Primera' });
    await expect(equipo.save()).rejects.toThrow();
  });

  test('Error si categoría no válida', async () => {
    const equipo = new Equipo({ nombre: 'Test', categoria: 'Cuarta' });
    await expect(equipo.save()).rejects.toThrow();
  });
});

describe('Modelo Jugador', () => {
  let equipoId;
  beforeAll(async () => {
    const eq = new Equipo({ nombre: 'Betis', ciudad: 'Sevilla', añoFundacion: 1907, categoria: 'Primera' });
    const guardado = await eq.save();
    equipoId = guardado._id;
  });

  test('Crear jugador válido', async () => {
    const jugador = new Jugador({ nombre: 'Juan', dorsal: 10, posicion: 'Delantero', equipo: equipoId });
    const guardado = await jugador.save();
    expect(guardado.nombre).toBe('Juan');
  });

  test('Error si dorsal es bajo', async () => {
    const jugador = new Jugador({ nombre: 'Pepe', dorsal: 0, posicion: 'Defensa', equipo: equipoId });
    await expect(jugador.save()).rejects.toThrow();
  });

  test('Error si posición no válida', async () => {
    const jugador = new Jugador({ nombre: 'Luis', dorsal: 5, posicion: 'Porterazo', equipo: equipoId });
    await expect(jugador.save()).rejects.toThrow();
  });

  test('Crear jugador sin equipo', async () => {
    const jugador = new Jugador({ nombre: 'SinEquipo', dorsal: 8, posicion: 'Centrocampista' });
    const guardado = await jugador.save();
    expect(guardado.nombre).toBe('SinEquipo');
  });

  test('Error si nombre es obligatorio', async () => {
    const jugador = new Jugador({ dorsal: 9, posicion: 'Delantero', equipo: equipoId });
    await expect(jugador.save()).rejects.toThrow();
  });

  test('Crear jugador con esTitular true', async () => {
    const jugador = new Jugador({ nombre: 'Mario', dorsal: 11, posicion: 'Defensa', esTitular: true, equipo: equipoId });
    const guardado = await jugador.save();
    expect(guardado.esTitular).toBe(true);
  });
});
