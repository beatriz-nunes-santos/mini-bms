const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://pf-9ny4968rn4lm0komk24x.cedalo.cloud:1883', {
  username: 'sensor1',
  password: 'bms12345',
  clientId: 'sensor1'
});

client.on('connect', () => {
  console.log('Sensor conectado na Cedalo!');
  setInterval(() => {
    const temp = (22 + Math.random() * 6).toFixed(2);
    const payload = JSON.stringify({ temperatura: parseFloat(temp) });
    client.publish('bms/temperatura/sala1', payload);
    console.log('Enviado: ' + payload);
  }, 3000);
});

client.on('error', (err) => {
  console.log('Erro:', err.message);
});