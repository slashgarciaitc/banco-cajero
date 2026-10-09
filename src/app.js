import express from 'express';
import { logger } from './middlewares/logger.js';
import { requireAdmin } from './middlewares/requireAdmin.js';
import { manejadorErrores, noEncontrado } from './middlewares/errores.js';
import cajeroRoutes from './routes/cajero.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();

app.use(logger);
app.use(express.json());
app.use(express.static('public'));

app.use('/api', cajeroRoutes);

// el panel está fuera de public/ para que pida usuario y contraseña
app.get('/admin', requireAdmin, (req, res) => {
  res.sendFile('admin.html', { root: 'vistas' });
});
app.use('/api/admin', requireAdmin, adminRoutes);

app.use(noEncontrado);
app.use(manejadorErrores);

export default app;
