#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Feb  5 22:35:23 2021

@author: lily
"""
import pandas as pd
import numpy as np
import networkx as nx
import copy
import RecoverSub
from RecoverSub import *

BaseNodeFile ='Scenario Files/Case0/node-file-case0.csv'
BaseEdgeFile ='Scenario Files/Case0/edge-file-case0.csv'

adj_all,adj_nml, backup_adj, V_bk, nodenames, nodepriority, nodeload, nodegen, edgestatus,\
prioritynodes, PV_id, criticalPQ_id, bk_fm, bk_to  =RecoverSub.loadbasecase(BaseNodeFile, BaseEdgeFile)
#define battery capacity
battery_capacity = 1000;
G_nml, TopoVector=RecoverSub.Topo_Recovery(adj_nml, nodenames, nodepriority, nodeload, PV_id, criticalPQ_id)
energy_storage1, gen_connected1, load_shedable_cap1, load_on1 = RecoverSub.paramextract(nodenames, nodeload, nodegen, nodepriority, adj_nml,1000, 1, 1, 70, 70)

# for normal case define
aver_redunpath1=0
load_loss1=0
gen_margin1 = load_loss1/(gen_connected1-load_on1)
energy_loss1=0

#for event case
Restoration_scenarios = list()
energy_loss2 = 0

for scenario_selector in range(1,4):  
    ScenNodeFile ='Scenario Files/Case{}/node-file-case{}.csv'.format(scenario_selector,scenario_selector)
    ScenEdgeFile ='Scenario Files/Case{}/edge-file-case{}.csv'.format(scenario_selector,scenario_selector)
    if scenario_selector==0:
        SOC=1;ORCA_load_level=1;WL_HBC=70; WL_PC=70; time_switch=0;
    elif scenario_selector==1:
        SOC=0.9;ORCA_load_level=1;WL_HBC=70; WL_PC=70; time_switch=1;redun_path2 =6;prioritynodes2=2783.7
    elif scenario_selector==2:
        SOC=0.8;ORCA_load_level=1;WL_HBC=70; WL_PC=70; time_switch=1; redun_path2 =4;prioritynodes2=1263.2
    elif scenario_selector==3:
        SOC=0.7;ORCA_load_level=1;WL_HBC=70; WL_PC=70; time_switch=1;redun_path2 =0;prioritynodes2=0

    eventdata =RecoverSub.loadbasecase(ScenNodeFile, ScenEdgeFile) 
    adj2 =eventdata[1]
    nodes2=eventdata[4]

    redun_path2,prioritynodes2 = RecoverSub.corrective_restoration(adj2,backup_adj,V_bk,nodepriority,nodeload,nodegen,bk_fm, bk_to)
    G2, TopoVector2 = RecoverSub.Topo_Recovery(adj2, nodes2, nodepriority, nodeload, PV_id, criticalPQ_id)

    # find the topological resilience
    #grid topology are the same for two cases
    if TopoVector ==TopoVector2: 
        AltTopoScore =1
        AltTopoScore =1
    else:
        [Alt1TopoScore, Alt2TopoScore]=RecoverSub.RunAHP_topology(TopoVector,TopoVector2)

    
    energy_storage2, gen_connected2, load_shedable_cap2, load_on2 = RecoverSub.paramextract(nodes2,nodeload, nodegen, nodepriority, adj2,1000,SOC,ORCA_load_level,WL_HBC,WL_PC);

    load_loss2=load_on1-load_on2

    # gen margin
    gen_margin2 = load_loss2/(gen_connected2-load_on2)
    #energy loss, time_switch/hour
    energy_loss2 += load_loss2*time_switch
    # 
    if prioritynodes2==0:
        aver_redunpath2=0
    elif redun_path2 ==0:
        aver_redunpath2=1
    else:
        aver_redunpath2=prioritynodes2/redun_path2
    
    Alt1CompositeScore = [Alt1TopoScore, aver_redunpath1, energy_storage1, gen_margin1, load_shedable_cap1, energy_loss1]
    Alt2CompositeScore = [Alt2TopoScore, aver_redunpath2, energy_storage2, gen_margin2, load_shedable_cap2, energy_loss2]
    #
    X1, X2, V = RecoverSub.RunAHP_Composite(Alt1CompositeScore, Alt2CompositeScore)
    #normalize score to base score
    X2 = np.real(X2/X1)
    X1 = X1/X1
    Restoration_scenarios.append(X2)
    print(Restoration_scenarios)


