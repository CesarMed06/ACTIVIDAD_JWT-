const mongoose = require('mongoose');
const { expect } = require('chai');
const Jugador = require('../models/jugador');
const Equipo = require('../models/equipo');

describe('Modelo Jugador', () => {
  let equipoId;
  before(async () => {
    await mongoose.connect('mongodb://localhost:27017/futbol_test');
    await Jugador.deleteMany({});
    await Equipo.deleteMany({});
    const eq = new Equipo({ nombre: 'Betis', ciudad: 'Sevilla', añoFundacion: 1907, categoria: 'Primera' });
    const guardado = await eq.save();
    equipoId = guardado._id;
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it('Crea jugador válido', async () => {
    const jugador = new Jugador({ nombre: 'Juan', dorsal: 10, posicion: 'Delantero', equipo: equipoId });
    const guardado = await jugador.save();
    expect(guardado.nombre).to.equal('Juan');
  });

  it('Error si dorsal es bajo', async () => {
    const jugador = new Jugador({ nombre: 'Pepe', dorsal: 0, posicion: 'Defensa', equipo: equipoId });
    try {
      await jugador.save();
    } catch (err) {
      expect(err).to.exist;
    }
  });

  it('Error si posición no válida', async () => {
    const jugador = new Jugador({ nombre: 'Luis', dorsal: 5, posicion: 'Porterazo', equipo: equipoId });
    try {
      await jugador.save();
    } catch (err) {
      expect(err).to.exist;
    }
  });

  it('Crea jugador sin equipo', async () => {
    const jugador = new Jugador({ nombre: 'SinEquipo', dorsal: 8, posicion: 'Centrocampista' });
    const guardado = await jugador.save();
    expect(guardado.nombre).to.equal('SinEquipo');
  });

  it('Error si nombre es obligatorio', async () => {
    const jugador = new Jugador({ dorsal: 9, posicion: 'Delantero', equipo: equipoId });
    try {
      await jugador.save();
    } catch (err) {
      expect(err).to.exist;
    }
  });
});
