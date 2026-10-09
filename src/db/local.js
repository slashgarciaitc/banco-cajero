import { mkdirSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { config } from '../config.js';

mkdirSync(config.dataDir, { recursive: true });
const db = new DatabaseSync(`${config.dataDir}/cajero.db`);

db.exec('CREATE TABLE IF NOT EXISTS config (clave TEXT PRIMARY KEY, valor TEXT)');

export function leerConfig() {
  const filas = db.prepare('SELECT clave, valor FROM config').all();
  return Object.fromEntries(filas.map((f) => [f.clave, f.valor]));
}

export function guardarConfig(valores) {
  const guardar = db.prepare('INSERT OR REPLACE INTO config (clave, valor) VALUES (?, ?)');
  for (const [clave, valor] of Object.entries(valores)) {
    guardar.run(clave, String(valor ?? ''));
  }
}
