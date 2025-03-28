"""
Funções para definir posições do robô pelo json
"""

import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
POSITIONS_DIR = os.path.join(BASE_DIR, "positions")

_ilhas_df = None
_fita_df = None

def _carregar_ilhas():
    global _ilhas_df
    if _ilhas_df is None:
        ilhas_path = os.path.join(POSITIONS_DIR, "posicoes_ilhas.json")
        _ilhas_df = pd.read_json(ilhas_path)
    return _ilhas_df

def _carregar_fita():
    global _fita_df
    if _fita_df is None:
        fita_path = os.path.join(POSITIONS_DIR, "fita.json")
        _fita_df = pd.read_json(fita_path)
    return _fita_df

def locais(i):
    ilhas = _carregar_ilhas()
    
    ilha_0 = ilhas[(ilhas['ilha'] == 0) & (ilhas['etapa'] == i)]
    ilha_1 = ilhas[(ilhas['ilha'] == 1) & (ilhas['etapa'] == i)]
    
    return ilha_0['position'].tolist() + ilha_1['position'].tolist()

def locais_fita(i):
    fita = _carregar_fita()
    
    fita_0 = fita[(fita['ilha'] == 0) & (fita['etapa'] == i)]
    fita_1 = fita[(fita['ilha'] == 1) & (fita['etapa'] == i)]

    return fita_0['position'].tolist() + fita_1['position'].tolist()