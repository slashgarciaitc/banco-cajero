import { config } from '../config.js';

export function requireAdmin(req, res, next) {
  const [, credenciales = ''] = (req.get('Authorization') ?? '').split(' ');
  const [usuario, password] = Buffer.from(credenciales, 'base64').toString().split(':');

  if (usuario === config.adminUsuario && password === config.adminPassword) {
    return next();
  }
  res.set('WWW-Authenticate', 'Basic realm="Cajero"');
  res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
}
