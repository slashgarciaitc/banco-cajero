export function noEncontrado(req, res) {
  res.status(404).json({ error: 'Ruta no encontrada' });
}

export function manejadorErrores(err, req, res, next) {
  const status = err.status ?? 500;
  if (status === 500) console.error(err);
  res.status(status).json({ error: status === 500 ? 'Error interno' : err.message });
}
