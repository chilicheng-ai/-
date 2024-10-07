let client;
let messageContent = 'Waiting for messages...';

// Shiftr.io credentials
const broker = 'wss://public.cloud.shiftr.io';
const options = {
  username: 'public',
  password: 'public',
  port: 443,
  protocol: 'wss' // WebSocket secure protocol
};

function setup() {
  createCanvas(500, 3000);
  textSize(16);
  textAlign(CENTER, CENTER);
  
  // Connect to the MQTT broker
  client = mqtt.connect(broker, options);

  // When client is connected
  client.on('connect', () => {
    console.log('Connected to MQTT broker');
    // Subscribe to the topic that matches your Python script
    client.subscribe('$$$');
  });

  // When a message arrives
  client.on('message', (topic, message) => {
    messageContent = `\n ${message.toString()}`;
    console.log(messageContent);  // Print to console for debugging
  });
}

function draw() {
  background(220);
  text(messageContent, width / 2, height / 2);
}
