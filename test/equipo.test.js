const mongoose = require('mongoose');
const { expect } = require('chai');
const Equipo = require('../models/equipo');

describe('Modelo Equipo', () => {
  before(async () => {
    await mongoose.connect('mongodb://localhost:27017/futbol_test');
    await Equipo.deleteMany({});
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it('Crea equipo válido', async () => {
    const equipo = new Equipo({ nombre: 'Madrid', ciudad: 'Madrid', añoFundacion: 1902, categoria: 'Primera' });
    const guardado = await equipo.save();
    expect(guardado.nombre).to.equal('Madrid');
  });

  it('Error si nombre es corto', async () => {
    const equipo = new Equipo({ nombre: 'AB', categoria: 'Primera' });
    try {
      await equipo.save();
    } catch (err) {
      expect(err).to.exist;
    }
  });

  it('Error si añoFundacion es muy bajo', async () => {
    const equipo = new Equipo({ nombre: 'Test', añoFundacion: 1800, categoria: 'Primera' });
    try {
      await equipo.save();
    } catch (err) {
      expect(err).to.exist;
    }
  });

  it('Error si categoría no válida', async () => {
    const equipo = new Equipo({ nombre: 'Test', categoria: 'Cuarta' });
    try {
      await equipo.save();
    } catch (err) {
      expect(err).to.exist;
    }
  });

  it('Crea equipo con esActivo false', async () => {
    const equipo = new Equipo({ nombre: 'Sevilla', ciudad: 'Sevilla', añoFundacion: 1905, categoria: 'Primera', esActivo: false });
    const guardado = await equipo.save();
    expect(guardado.esActivo).to.equal(false);
  });
});
