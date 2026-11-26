// Rigenera le icone PNG dell'app da icons/icon.svg (aereo) usando Edge senza finestra: node make-icons.js
const { execFileSync } = require('child_process');
const fs = require('fs'), path = require('path'), os = require('os');
const edge = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(fs.existsSync);
if (!edge) throw new Error('Edge non trovato');
const dir = path.join(__dirname, 'icons');
for (const s of [512, 192]) {
  const html = path.join(os.tmpdir(), `ferie-icona-${s}.html`);
  fs.writeFileSync(html, `<html><body style="margin:0"><img src="file:///${dir.replace(/\\/g, '/')}/icon.svg" width="${s}" height="${s}" style="display:block"></body></html>`);
  execFileSync(edge, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', `--window-size=${s},${s}`, `--screenshot=${path.join(dir, `icon-${s}.png`)}`, html]);
}
console.log('Icone aggiornate.');
