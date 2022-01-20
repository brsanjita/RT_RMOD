"""
Copyright © Prof. Anurag Srivastava, Gowtham Kandaperumal, Linli Jia, and Dr. Sanjeev Pannala.
No image or information should be reproduced, transmitted, or copied without the prior agreement with Prof. Srivastava.
"""

# -*- coding: utf-8 -*-

"""
Created on Tue Jan 19 18:09:47 2021

@author: kand506
args:
    description:
"""


import csv
import numpy as np
from collections import defaultdict
import networkx as nx
import math
import statistics as stat
import scipy.linalg as la


def topo_extract(G, nodenames):
    nodenum = len(G)
    dia = nx.diameter(G)
    betw = nx.betweenness_centrality(G, k=None, normalized=True, weight=None,
                                     endpoints=False, seed=None)
    CB = sum(betw.values())/len(G)

    lambda_alg = nx.linalg.algebraicconnectivity.algebraic_connectivity(
        G, weight="weight", normalized=False, tol=1e-8, method="tracemin_lu",
        seed=None)
    numedges = nx.number_of_edges(G)
    # Degree Distribution

    degrees = [val for (node, val) in G.degree()]

    K = 2*numedges/nodenum

    K2 = math.pow((stat.pstdev(degrees)), 2)
    k0 = K2/K

    # percholation
    fc = 1 - 1/(k0 - 1)

    return G, [dia, CB, lambda_alg, fc, K]


def loadbasecase_func(nodefile, edgefile):

    edgedict = defaultdict(list)

    # Process Edge File
    with open(edgefile, 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for line in csv_reader:
            for key, value in line.items():
                edgedict[key].append(value)

    edgedataraw = list(edgedict.items())
    edgedata = np.array(edgedataraw)

    # Process Node file

    nodedict = defaultdict(list)

    with open(nodefile, 'r') as csv_file1:
        csv_reader1 = csv.DictReader(csv_file1)
        for line in csv_reader1:
            for key, value in line.items():
                nodedict[key].append(value)

    nodedataraw = list(nodedict.items())
    nodedata = np.array(nodedataraw)

    # # convert edge file to Lists
    # feeder_name = edgedata.tolist()[0][1]
    from_node = edgedata.tolist()[1][1]
    to_node = edgedata.tolist()[2][1]
    # status = edgedata.tolist()[3][1]

    # Node file to list

    nodename = nodedata.tolist()[0][1]
    # voltage = nodedata.tolist()[1][1]
    # load = nodedata.tolist()[2][1]
    # gen = nodedata.tolist()[3][1]
    # kind = nodedata.tolist()[4][1]
    crit = nodedata.tolist()[5][1]
    # PR = nodedata.tolist()[6][1]
    prioritynodes = 0

    numnodes = len(nodename)

    for i in range(0, numnodes):
        if crit[i] == '1':
            prioritynodes += 1

    edgel = []

    for i in range(len(from_node)):
        edgel.append((from_node[i], to_node[i]))

    # create graphhs

    G = nx.Graph()
    G.add_edges_from(edgel)
    A = nx.adjacency_matrix(G)

    return A, nodename, nodedata, edgedata, prioritynodes, G


def AHP_5factors():
    PCM2 = np.array([[1, 0.333, 0.5, 0.25, 0.5],
                     [3, 1, 2, 0.333, 2],
                     [2, 0.5, 1, 0.5, 1],
                     [4, 3, 2, 1, 2],
                     [2, 0.5, 1, 0.5, 1]])
    # eigenvalues = la.eig(PCM2)
    # Eigenvalues to be updated
    # hardcoded weights based on previous eig weights
    U = np.zeros(5)
    weights = [0.05, 0.2, 0.15, 0.45, 0.3]
    for i in range(len(weights)):
        U[i] = 0
        for j in range(5):
            U[i] = U[i] + V[i][j] * weights[j]
