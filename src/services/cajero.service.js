import { leerConfig, guardarConfig } from '../db/local.js';
import * as central from './central.js';

function error(status, mensaje) {
  const err = new Error(mensaje);
  err.status = status;
  return err;
}

function apiKey() {
  const { api_key } = leerConfig();
  if (!api_key) throw error(503, 'El cajero no está configurado');
  return api_key;
}

function validar(cuenta, monto) {
  if (!cuenta) throw error(400, 'Falta el número de cuenta');
  if (!(monto > 0)) throw error(400, 'El monto debe ser mayor a 0');
}

export function estado() {
  const { nombre, api_key } = leerConfig();
  return { nombre: nombre ?? null, configurado: Boolean(api_key) };
}

export async function consultarSaldo(cuenta) {
  return central.consultarSaldo(apiKey(), cuenta);
}

export async function retirar(cuenta, monto) {
  const key = apiKey();
  validar(cuenta, monto);

  // antes de ir al banco central se revisa que el cajero tenga el efectivo
  const { efectivo } = leerConfig();
  if (Number(efectivo) < monto) {
    throw error(422, 'El cajero no tiene efectivo suficiente');
  }

  const resultado = await central.retirar(key, cuenta, monto);
  guardarConfig({ efectivo: resultado.efectivo_nodo });
  return resultado;
}

export async function depositar(cuenta, monto) {
  const key = apiKey();
  validar(cuenta, monto);

  const resultado = await central.depositar(key, cuenta, monto);
  guardarConfig({ efectivo: resultado.efectivo_nodo });
  return resultado;
}
