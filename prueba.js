console.log('Probando la API de fútbol...\n');

fetch('http://localhost:3000/equipos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nombre: 'Atlético Madrid',
    ciudad: 'Madrid',
    añoFundacion: 1903,
    categoria: 'Primera'
  })
})
.then(res => res.json())
.then(data => {
  console.log('✓ Equipo creado:', data);
  const equipoId = data._id;
  
  return fetch('http://localhost:3000/jugadores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre: 'Carlos Ruiz',
      dorsal: 9,
      posicion: 'Delantero',
      esTitular: true,
      fechaNacimiento: '1997-06-20',
      fechaFichaje: '2024-01-15',
      equipo: equipoId
    })
  });
})
.then(res => res.json())
.then(data => {
  console.log('✓ Jugador creado:', data);
  
  return fetch('http://localhost:3000/jugadores');
})
.then(res => res.json())
.then(data => {
  console.log('\n✓ Lista de jugadores con equipo (populate):');
  console.log(JSON.stringify(data, null, 2));
  
  return fetch('http://localhost:3000/partidos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      equipoLocal: 'Atlético Madrid',
      equipoVisitante: 'Valencia',
      golesLocal: 2,
      golesVisitante: 2,
      jugado: true,
      fecha: '2024-11-10'
    })
  });
})
.then(res => res.json())
.then(data => {
  console.log('\n✓ Partido creado:', data);
  console.log('\n=== TODO FUNCIONA CORRECTAMENTE ===');
})
.catch(err => console.error('Error:', err.message));
