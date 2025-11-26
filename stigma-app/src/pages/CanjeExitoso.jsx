import React from 'react';
import ConfirmacionCanje from '../components/ConfirmacionCanje';

function CanjeExitoso() {
  const saldoActualizado = 240; // Ejemplo, se debería traer del backend

  return <ConfirmacionCanje saldo={saldoActualizado} />;
}

export default CanjeExitoso;
