const express = require('express');
const os = require('os');
const path = require('path');
const app = express();
const port = 3000;

// Configura o Express para servir o arquivo mp3 que está na raiz
app.use(express.static(path.join(__dirname, '.')));

app.get('/', (req, res) => {
    const hostname = os.hostname();
    const platform = os.platform();
    const uptime = Math.floor(os.uptime() / 60);

    const html = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Meu Homelab - Node.js</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #1a1a1a; color: white; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; }
            .card { background: #2d2d2d; padding: 2rem; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); text-align: center; border-top: 5px solid #00ff88; max-width: 500px; width: 100%; }
            
            /* Estilos para a seção do Patrocinador */
            .sponsor-section { margin-bottom: 1.5rem; border-bottom: 1px solid #444; padding-bottom: 1rem; }
            .sponsor-label { color: #b3b3b3; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem; display: block; }
            .sponsor-logo { max-width: 150px; height: auto; display: block; margin: 0 auto; }

            h1 { color: #00ff88; margin-top: 0; margin-bottom: 0.5rem; font-size: 1.8rem; }
            p { color: #b3b3b3; font-size: 1rem; line-height: 1.4; }
            .info { background: #3d3d3d; padding: 1rem; border-radius: 8px; margin-top: 1.5rem; text-align: left; }
            .info p { margin: 0.5rem 0; font-size: 0.9rem; }
            .badge { background: #00ff88; color: #1a1a1a; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 0.8rem; }

            /* Estilo do Botão de Áudio */
            .audio-section { margin-top: 20px; padding-top: 20px; border-top: 1px dashed #444; }
            .btn-play { 
                background: #00ff88; 
                color: #1a1a1a; 
                border: none; 
                padding: 12px 24px; 
                border-radius: 8px; 
                cursor: pointer; 
                font-weight: bold; 
                text-transform: uppercase;
                transition: transform 0.2s, background 0.2s;
            }
            .btn-play:hover { background: #00cc6e; transform: scale(1.05); }
            .btn-play:active { transform: scale(0.95); }
        </style>
    </head>
    <body>
        <div class="card">
            <div class="sponsor-section">
                <span class="sponsor-label">Patrocinador Oficial</span>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdH7n-7vtQUyyVYAD_Vlk93GEttglSdKhhpA&s" alt="Logo do Patrocinador" class="sponsor-logo">
            </div>

            <h1>🚀 Kubernetes HomeLab</h1>
            <p>Seu mini-site com Express está rodando com sucesso no cluster RKE2</p>
            
            <div class="info">
                <p><strong>Hostname (POD):</strong> <span class="badge">${hostname}</span></p>
                <p><strong>Plataforma:</strong> ${platform}</p>
                <p><strong>Uptime:</strong> ${uptime} minutos</p>
            </div>

            <div class="audio-section">
                <audio id="player">
                    <source src="biglouis.mp3" type="audio/mpeg">
                </audio>
                <button class="btn-play" onclick="toggleAudio()">🎵 CLIQUE AQUI</button>
            </div>
        </div>

        <script>
            const audio = document.getElementById('player');
            function toggleAudio() {
                if (audio.paused) {
                    audio.play();
                } else {
                    audio.pause();
                }
            }
        </script>
    </body>
    </html>
    `;
    res.send(html);
});

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});