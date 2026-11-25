# Mini BMS - Sala 1 🌡️

Painel IoT de monitoramento de temperatura e umidade em tempo real.

**Como funciona:** Sensor → MQTT (Cedalo Cloud) → Node.js → Painel Web

## Tecnologias
- Node.js + Express
- MQTT / Cedalo Cloud
- JavaScript / HTML / CSS

## Como rodar
1. `npm install`
2. Crie um `.env` baseado no `.env.example`
3. `node server.js`
4. Acesse `http://localhost:3000`

## O que aprendi
- Resolvido bug de `clientId` duplicado no MQTT que derrubava a conexão
- Diferença entre publicar e apenas assinar um tópico
