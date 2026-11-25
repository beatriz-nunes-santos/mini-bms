const mqtt = require('mqtt');
const express = require('express');
const app = express();
let ultima = { temperatura: 0, umidade: 0, hora: 'aguardando...' };

require('dotenv').config();
const client = mqtt.connect(process.env.MQTT_URL, {
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASS,
});

client.on('connect', () => {
  console.log('Painel conectado na Cedalo!');
  client.subscribe('bms/#');
});

client.on('message', (topic, msg) => {
  try {
    const d = JSON.parse(msg.toString());
    ultima = { temperatura: d.temperatura, umidade: d.umidade, hora: new Date().toLocaleTimeString() };
    console.log('Recebido:', ultima);
  } catch(e) {}
});

app.get('/api', (req, res) => res.json(ultima));

app.get('/', (req, res) => {
  res.send(`
  <html><head><meta charset="utf-8"><style>
  body{font-family:Arial;background:#0f172a;color:white;display:flex;justify-content:center;align-items:center;height:100vh;margin:0}
  .card{background:#1e293b;padding:30px;border-radius:20px;text-align:center;width:320px;box-shadow:0 10px 30px rgba(0,0,0,.5)}
  .temp{font-size:64px;font-weight:bold;color:#38bdf8}
  .umi{font-size:22px;color:#a5f3fc;margin-top:10px}
  .hora{color:#94a3b8;margin-top:15px;font-size:14px}
  .ok{color:#4ade80}
  </style></head><body>
  <div class="card">
    <h2>Mini BMS - Sala 1</h2>
    <p class="ok">● Conectado</p>
    <div class="temp"><span id="t">--</span>°C</div>
    <div class="umi">Umidade: <span id="u">--</span>%</div>
    <div class="hora">Última atualização: <span id="h">--</span></div>
  </div>
  <script>
    async function atualiza(){
      const r = await fetch('/api'); const d = await r.json();
      document.getElementById('t').innerText = d.temperatura;
      document.getElementById('u').innerText = d.umidade;
      document.getElementById('h').innerText = d.hora;
    }
    setInterval(atualiza, 2000); atualiza();
  </script>
  </body></html>`);
});
app.listen(3000, () => console.log('Site no http://localhost:3000'));