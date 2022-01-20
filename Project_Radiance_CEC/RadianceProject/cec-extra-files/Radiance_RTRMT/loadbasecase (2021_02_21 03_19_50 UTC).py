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

    # pyplot.spy(A)
    # nx.draw(G)

    # k = 1
    # for i in range(0, len(from_node)):
    #     dotm[i][0] = from_node[i][0]
    #     dotm[i][1] = from_node[i][1]
