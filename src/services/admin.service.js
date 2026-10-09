import { leerConfig, guardarConfig } from '../db/local.js';
import * as central from './central.js';

export function estado() {
  const { api_key, nombre, responsable, efectivo } = leerConfig();
  if (!api_key) return { configurado: false };
  return {
    configurado: true,
    nombre,
    responsable,
    efectivo: Number(efectivo),
    api_key: api_key.slice(0, 10) + '...',
  };
}

async function datosDelNodo(apiKey) {
  try {
    return await central.infoNodo(apiKey);
  } catch (err) {
    // con 401 el navegador vuelve a pedir la contraseña del panel
    if (err.status === 401) err.status = 400;
    throw err;
  }
}

export async function configurar(apiKey) {
  const nodo = await datosDelNodo(apiKey);
  if (nodo.tipo !== 'cajero') {
    const err = new Error('Esa API key es de una sucursal, no de un cajero');
    err.status = 400;
    throw err;
  }

  guardarConfig({
    api_key: apiKey,
    nombre: nodo.nombre,
    responsable: nodo.responsable,
    efectivo: nodo.efectivo,
  });
  return estado();
}

// vuelve a pedir al banco central el efectivo asignado al cajero
export async function sincronizar() {
  const nodo = await datosDelNodo(leerConfig().api_key);
  guardarConfig({ efectivo: nodo.efectivo });
  return estado();
}
