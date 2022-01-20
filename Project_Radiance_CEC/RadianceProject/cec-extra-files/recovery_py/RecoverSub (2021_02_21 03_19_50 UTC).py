#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Jan 18 10:52:54 2021

@author: lily
"""
##import data
import pandas as pd
import numpy as np
import networkx as nx
import copy

def loadbasecase(node_file, edge_file):
    node_df = pd.read_csv(node_file, delimiter=',')
    edge_df = pd.read_csv(edge_file, delimiter=',')
# make data into array
    nodenames = np.array(node_df['name'])   
    nodeload = np.array(node_df['load'])
    nodegen = np.array(node_df['gen'])
    nodekind = np.array(node_df['kind'])
    nodepriority = np.array(node_df['critical'])
# index of PV nodes, PQ critical nodes
    PV_id = np.array([])
    criticalPQ_id = np.array([])
    prioritynodes =0; #number of prioritynodes
    for k in range(len(nodekind)):
        if nodekind[k].strip()=='PV':
            PV_id = np.r_[PV_id,k]
        elif nodekind[k].strip()=='PQ': 
            if nodepriority[k]==1:
                prioritynodes +=1
                criticalPQ_id = np.r_[criticalPQ_id,k] 
            
    fromnode = np.array(edge_df['from_node'])
    tonode = np.array(edge_df['to_node'])
    edgestatus = np.array(edge_df['status'])
#form adj matrix
    adj_all = np.zeros((len(nodenames), len(nodenames)))
    adj_nml = np.zeros((len(nodenames), len(nodenames))) #adj of normal operation lines
    adj_bk = np.zeros((len(nodenames), len(nodenames)))  #adj of backup lines
    V_bk_1 = np.array([])
    bk_fm = np.array([])
    bk_to = np.array([])
    
    for k in range(len(fromnode)):
        index_fm = np.argwhere(nodenames==fromnode[k])
        index_to = np.argwhere(nodenames==tonode[k])
        adj_all[index_fm,index_to]=1
        adj_all[index_to,index_fm]=1
        if edgestatus[k] == 1:
            adj_nml[index_fm,index_to]=1
            adj_nml[index_to,index_fm]=1
        elif edgestatus[k]== 0:
            bk_fm = np.append(bk_fm, index_fm)
            bk_to = np.append(bk_to, index_to)            
            adj_bk[index_fm,index_to]=1
            adj_bk[index_to,index_fm]=1
            V_bk_1 =np.append(V_bk_1,[index_fm, index_to])
    V_bk = np.unique(V_bk_1)  
            
# form a low dimension metric only for backup nodes according to 'V_bk'
    backup_adj = np.zeros((len(V_bk), len(V_bk)))
    for i in range(len(V_bk)):
        for j in range(len(V_bk)):
            backup_adj[i,j]= adj_bk[int(V_bk[i]),int(V_bk[j])]
    return adj_all,adj_nml, backup_adj, V_bk, nodenames, nodepriority, nodeload, nodegen, edgestatus,\
prioritynodes, PV_id, criticalPQ_id, bk_fm, bk_to  
      
def Topo_Recovery(adj_nml, nodenames, nodepriority, nodeload, PV_id, criticalPQ_id):
    G_nml = nx.from_numpy_matrix(adj_nml)
    #efficiency
    numnodes = len(adj_nml)
    source = PV_id
    destination = np.append(PV_id, criticalPQ_id)
    distances = dict(nx.all_pairs_shortest_path_length(G_nml))
    temp =0
    Num_path=0
    lst_dstns = list(distances.values()) #len=numnodes, each dic is all connections of the node
    for i in source:
        d_fm =int(i)
        d_to = list(lst_dstns[d_fm].keys())
        d=list(lst_dstns[d_fm].values())
        id_con, i_destin, i_to = intersect_mtlb(destination, d_to)
        for i in i_to:
            if d[i]!=0:
                Num_path +=1
                temp += 1/d[i]
    efficiency = temp/Num_path
    
    # Aggregate critical nodes betweenness centrality
    
    betw_allnodes = nx.betweenness_centrality(G_nml, normalized=True)
    sum_betw_cnl = 0
    N_cln =0
    for i in range(len(betw_allnodes)):
        if nodepriority[i] in (1,2):
            N_cln+=1
            sum_betw_cnl+=nodeload[i]*betw_allnodes[i]
    betw_cnl = sum_betw_cnl/N_cln
    
    #Algebraic connectivity
    Alg_c = nx.linalg.algebraicconnectivity.algebraic_connectivity(G_nml)
            
    #graph redundancy = 1/effective graph resistance
    temp =0
    L = nx.laplacian_matrix(G_nml)
    e = np.linalg.eigvals(L.A)
    for i in range(len(e)):
        e_round= round(e[i],4) 
        if e_round>0:
            temp += (1/e_round)
    R=numnodes/temp
    TopoVector = [Alg_c, R, betw_cnl, efficiency]
       
    return G_nml, TopoVector
 
def paramextract(nodenames, nodeload, nodegen, nodepriority, adj,battery_capacity, SOC, ORCA_load_level, WL_HBC, WL_PC):
    #revise generation of ORCA, HBC, and PC according load_level, and water head level
    nodegen_c =copy.deepcopy(nodegen)
    energy_storage = battery_capacity*SOC    
    gen_connected = energy_storage
    ORCA=np.array(['N303','N304','N305','N306','N307','N308'])
    HBC = np.array(['N201','N202','N203'])
    PC = np.array(['N101','N102'])
    for i in range(len(nodegen)):
        if np.isnan(nodegen_c[i])or np.isinf(nodegen_c[i]):
            nodegen_c[i]=0
        if nodenames[i].strip() in ORCA:
            nodegen_c[i]= nodegen_c[i]*ORCA_load_level*0.8 #power factor=0.8
        if nodenames[i].strip() in HBC:
            nodegen_c[i]= 0.95*1000*1*9.81*WL_HBC*0.001 #in kw, 
        if nodenames[i].strip() in PC:
            nodegen_c[i]= 0.95*1000*1*9.81*WL_PC*0.001 #in kw, 
         #calculate connected generation in all
        gen_connected += nodegen_c[i]
    #P=Î¼Ïqgh,Î¼=efficiency, in general in the range 0.75 to 0.95;change this value according to actual parameters 
    #Ï=density(kg/m3),1000kg/m3 for water;
    #q=water flow(m3/s);here suppose equal to 1, change this value according to actual parameters
    #g=acceleration of gravity(9.81m/s2)
    #h=falling height, head(m)
    
    # load shedding flexibility
    load_shedable_cap =0
    for i in range(len(nodepriority)):
        if nodepriority[i]== 3:
            load_shedable_cap +=nodeload[i]
    
    load_on = sum(nodeload)
        
    return energy_storage, gen_connected, load_shedable_cap, load_on
    
def intersect_mtlb(a, b):
    a1, ia = np.unique(a, return_index=True)
    b1, ib = np.unique(b, return_index=True)
    aux = np.concatenate((a1, b1))
    aux.sort()
    c = aux[:-1][aux[1:] == aux[:-1]]
    return c, ia[np.isin(a1, c)], ib[np.isin(b1, c)]
# a = np.array([7, 1, 7, 7, 4]);
# b = np.array([7, 0, 4, 4, 0]);
# c, ia, ib = intersect_mtlb(a, b)
# print(c, ia, ib)

def unique(list1, unique_list):
    for x in list1:  #traverse for all elements
         # check if exists in unique_list or not 
        if x not in unique_list: 
            unique_list.append(x) 
    return unique_list
       
def corrective_restoration(adj2, backup_adj,V_bk,nodepriority,nodeload,nodegen,bk_fm,bk_to):
    G_even = nx.from_numpy_matrix(adj2)
    Output=sorted(nx.connected_components(G_even),key=len, reverse=True) #connected components
    for i in range(len(Output)):
        Output[i]=np.array(list(Output[i]))
    # revise 'backup_adj' by adding virtual buses  
    #id_res_group = np.array([]) # id of the groups
    vir_node = np.array([]) #initial number of virtual node
    virtual_nodes = np.array([])
    nodes_inter =list()  #the intersect nodes
    id_inter_Vbk = list()
    for i in range(len(Output)):
        nodes_inter_temp,_,id_inter_Vbk_temp = intersect_mtlb(Output[i],V_bk)
        nodes_inter.append(np.append(nodes_inter_temp,(len(adj2)+i)))    
        id_inter_Vbk.append(id_inter_Vbk_temp)
        vir_node = np.append(vir_node,len(adj2)+i) #name of the new virtual node
        V_bk = np.append(V_bk, vir_node[-1])
        virtual_nodes = np.append(virtual_nodes, len(V_bk)-1) # added num of rows, columns
    backup_adj_tg=np.zeros((len(V_bk),len(V_bk)))
    backup_adj_tg[:backup_adj.shape[0], :backup_adj.shape[1]]=backup_adj
    for i in range(len(virtual_nodes)):
        row=int(virtual_nodes[i])
        col = id_inter_Vbk[i]
        backup_adj_tg[row,col]=1
    for i in range(len(virtual_nodes)):
        col=int(virtual_nodes[i])
        row = id_inter_Vbk[i]
        backup_adj_tg[row,col]=1 
        
    # remove self loop
    for i in range(len(id_inter_Vbk)):
        for j in id_inter_Vbk[i]:
            for k in id_inter_Vbk[i]:
                if  backup_adj_tg[j,k]==1:
                    backup_adj_tg[j,k]=0
                    
    # get all possible paths    
    G_backup = nx.from_numpy_matrix(backup_adj_tg)
    # search_end = [int(virtual_nodes[0])]
    resplan_all = list()
    for i in range(1,len(virtual_nodes)):
        search_start = int(virtual_nodes[i])
        for j in range(0,i):
            search_end = int(virtual_nodes[j])
            pth = nx.all_simple_paths(G_backup, source=search_start, target=search_end)
            resplan_all.append(pth)     
    
    #count redundant pahs used
    redun_path2 = 0
    unique_list = list() 
    for i in range(len(resplan_all)):
        temp_list = list(resplan_all[i])
        for j in range(len(temp_list)):
            unique_list = unique(temp_list[j],unique_list)            
    unique_list_ori=list()
    for i in range(len(unique_list)):
        id= unique_list[i]
        unique_list_ori.append(V_bk[id])   
    for i in range(len(bk_fm)):
        if bk_fm[i] in unique_list_ori and bk_to[i] in unique_list_ori:
            redun_path2 +=1
            
    # calculate prioritynodes2
    prioritynodes2=0
    for i in range(1,len(Output)):
        for j in range(len(Output[i])):
            id=Output[i][j]
            if nodepriority[id]==1:
                prioritynodes2 +=nodeload[id]
     
    return  redun_path2, prioritynodes2 

def RunAHP_topology(Alt1, Alt2):
    # inputs--Alt1, Alt2 are vectors of resiliency factors
    # output--resilience score for both alternatives--R1,R2
    nInd = 4
    nScen =3
    #Create vector D+1-->positive influence; -1-->Negative influence
    D=[+1, +1,-1,+1]
    Alt3 = [0,0,9999,0]
    X=np.array([Alt1,Alt2,Alt3])
    
    #linearize X to V
    V=np.zeros_like(X)
    for i in range(nScen):
        for j in range(nInd):
            if D[j] ==1:
                V[i,j]= (X[i,j]-min(X[:,j]))/(max(X[:,j])-min(X[:,j]))
            elif D[j]==-1:
                V[i,j]= (max(X[:,j])-X[i,j])/(max(X[:,j])-min(X[:,j]))
            
    weights = [0.05,0.05, 0.2,0.5]
    #calculate the score
    U =[0]*nScen
    for i in range(nScen):
        for j in range(nInd):
            U[i]+=V[i,j]*weights[j]
    R1=U[0]
    R2=U[1]
    R2=R2/R1
    R1=R1/R1
    
    return R1, R2
    
    
def RunAHP_Composite(Alt1, Alt2):
    # inputs--Alt1, Alt2 are vectors of resiliency factors
    # output--resilience score for both alternatives--R1,R2
    nInd = 6
    nScen =3
    #Create vector D+1-->positive influence; -1-->Negative influence
    D=[+1,-1,+1,-1,+1,-1]
    Alt3 = [0,9999,0,1,0,9999]
    X=np.array([Alt1,Alt2,Alt3])
    
    #linearize X to V
    V=np.zeros_like(X)
    for i in range(nScen):
        for j in range(nInd):
            if D[j] ==1:
                V[i,j]= (X[i,j]-min(X[:,j]))/(max(X[:,j])-min(X[:,j]))
            elif D[j]==-1:
                V[i,j]= (max(X[:,j])-X[i,j])/(max(X[:,j])-min(X[:,j]))
            
    weights = [0.1, 0.7, 0.3, 0.4, 0.3, 0.2]
    #calculate the score
    U =[0]*nScen
    for i in range(nScen):
        for j in range(nInd):
            U[i]+=V[i,j]*weights[j]
    R1=U[0]
    R2=U[1]    
    return R1, R2, V      
    
    
    
        
        
    
    
    
   
        
        
    
   
            
    
            
    
    
    
    
    
    
    

        

        
       
