import { Router } from 'express';
import * as cajero from '../services/cajero.service.js';

const router = Router();

router.get('/estado', (req, res) => {
  res.json(cajero.estado());
});

router.get('/cuentas/:cuenta/saldo', async (req, res) => {
  res.json(await cajero.consultarSaldo(req.params.cuenta));
});

router.post('/retiros', async (req, res) => {
  const { numero_cuenta, monto } = req.body ?? {};
  res.status(201).json(await cajero.retirar(numero_cuenta, monto));
});

router.post('/depositos', async (req, res) => {
  const { numero_cuenta, monto } = req.body ?? {};
  res.status(201).json(await cajero.depositar(numero_cuenta, monto));
});

export default router;
