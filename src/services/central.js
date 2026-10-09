import { createClient } from '@supabase/supabase-js';
import { config } from '../config.js';

const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);

async function llamar(funcion, parametros) {
  const { data, error, status } = await supabase.rpc(funcion, parametros);
  if (error) {
    const err = new Error(error.message);
    // si no hubo respuesta del servidor, el central no está disponible
    err.status = status || 503;
    throw err;
  }
  return data;
}

export const infoNodo = (apiKey) =>
  llamar('info_nodo', { p_api_key: apiKey });

export const consultarSaldo = (apiKey, cuenta) =>
  llamar('consultar_saldo', { p_api_key: apiKey, p_numero_cuenta: cuenta });

export const retirar = (apiKey, cuenta, monto) =>
  llamar('retirar', { p_api_key: apiKey, p_numero_cuenta: cuenta, p_monto: monto });

export const depositar = (apiKey, cuenta, monto) =>
  llamar('depositar', { p_api_key: apiKey, p_numero_cuenta: cuenta, p_monto: monto });
