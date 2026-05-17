const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function probarAPI() {
  try {
    console.log('=== PROBANDO EQUIPOS ===\n');
    
    const equipo = await axios.post(`${BASE_URL}/equipos`, {
      nombre: 'Barcelona',
      ciudad: 'Barcelona',
      añoFundacion: 1899,
      categoria: 'Primera'
    });
    console.log('✓ Equipo creado:', equipo.data);
    const equipoId = equipo.data._id;
    
    const equipos = await axios.get(`${BASE_URL}/equipos`);
    console.log('\n✓ Equipos en base de datos:', equipos.data.length);
    
    console.log('\n=== PROBANDO JUGADORES ===\n');
    
    const jugador = await axios.post(`${BASE_URL}/jugadores`, {
      nombre: 'Pedro García',
      dorsal: 7,
      posicion: 'Centrocampista',
      esTitular: true,
      fechaNacimiento: '1998-03-10',
      fechaFichaje: '2024-07-01',
      equipo: equipoId
    });
    console.log('✓ Jugador creado:', jugador.data);
    
    const jugadores = await axios.get(`${BASE_URL}/jugadores`);
    console.log('\n✓ Jugadores (con populate):', jugadores.data);
    
    console.log('\n=== PROBANDO PARTIDOS ===\n');
    
    const partido = await axios.post(`${BASE_URL}/partidos`, {
      equipoLocal: 'Barcelona',
      equipoVisitante: 'Sevilla',
      golesLocal: 3,
      golesVisitante: 1,
      jugado: true,
      fecha: '2024-12-15'
    });
    console.log('✓ Partido creado:', partido.data);
    
    const partidos = await axios.get(`${BASE_URL}/partidos`);
    console.log('\n✓ Total partidos:', partidos.data.length);
    
    console.log('\n=== PRUEBAS COMPLETADAS ===');
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

probarAPI();
