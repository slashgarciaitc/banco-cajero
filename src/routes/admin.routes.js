import { Router } from 'express';
import * as admin from '../services/admin.service.js';

const router = Router();

router.get('/estado', (req, res) => {
  res.json(admin.estado());
});

router.put('/config', async (req, res) => {
  res.json(await admin.configurar(req.body?.api_key));
});

router.post('/sincronizar', async (req, res) => {
  res.json(await admin.sincronizar());
});

export default router;
