"""
Classe do Controlador do robô Dobot feito por Murilo.
"""

import pydobot

class InteliDobot(pydobot.Dobot):
    """Classe estendida do Dobot com funções adicionais de movimento."""
    
    def __init__(self, port=None, verbose=False):
        super().__init__(port=port, verbose=verbose)

    def movej_to(self, x, y, z, r, wait=True):
        """Movimento de junta para uma posição específica."""
        super()._set_ptp_cmd(x, y, z, r, mode=pydobot.enums.PTPMode.MOVJ_XYZ, wait=wait)

    def movel_to(self, x, y, z, r, wait=True):
        """Movimento linear para uma posição específica."""
        super()._set_ptp_cmd(x, y, z, r, mode=pydobot.enums.PTPMode.MOVL_XYZ, wait=wait)    
    
    def GoHomeInteli(self):
        """Move o robô para a posição 'home'."""
        msg = pydobot.message.Message()
        msg.id = pydobot.enums.CommunicationProtocolIDs.CommunicationProtocolIDs.SET_HOME_CMD
        msg.ctrl = pydobot.enums.ControlValues.ControlValues.ONE
        msg.params = []  # Inicializa params para evitar erro de NoneType
        return super()._send_command(msg)
    
    def SetSpeed(self, speed, acceleration):
        """Define a velocidade e aceleração do robô."""
        super().speed(speed, acceleration)
    
    def movej_angles(self, j1, j2, j3, j4, wait=True):
        """Movimento de junta para ângulos específicos."""
        mode = pydobot.enums.PTPMode.MOVJ_ANGLE
        self._set_ptp_cmd(j1, j2, j3, j4, mode=mode, wait=wait)