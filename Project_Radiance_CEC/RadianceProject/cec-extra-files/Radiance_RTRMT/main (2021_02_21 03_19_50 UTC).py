"""
Copyright © Prof. Anurag Srivastava, Gowtham Kandaperumal, Linli Jia, and Dr. Sanjeev Pannala.
No image or information should be reproduced, transmitted, or copied without the prior agreement with Prof. Srivastava.
"""

import csv
import numpy as np
from collections import defaultdict
from AWR_py_function import *
import networkx as nx
from networkx import linalg
from networkx import algorithms
from networkx import *
import scipy as sp
import statistics as stat
import math
import matplotlib.pyplot as plt

filename = r'resiliency_withstand_jan13\LAslice_2019.csv'
my_dict = defaultdict(list)

with open(filename, 'r') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for line in csv_reader:
        for key, value in line.items():
            my_dict[key].append(value)

data = list(my_dict.items())
eventdata = np.array(data)
# convert read file to Lists

nodefile = r"C:\Users\rocki\Documents\ASWork\Visual Studio Workspace\Radiance-CEC\RadianceProject\cec-extra-files\Radiance_RTRMT\resiliency_withstand_jan13\Scenario Files\Case0\node-file-case0.csv"
edgefile = r"C:\Users\rocki\Documents\ASWork\Visual Studio Workspace\Radiance-CEC\RadianceProject\cec-extra-files\Radiance_RTRMT\resiliency_withstand_jan13\Scenario Files\Case0\edge-file-case0.csv"


load_LA = eventdata.tolist()[1][1]
load_MT = eventdata.tolist()[2][1]
load_NT = eventdata.tolist()[3][1]
load_13m = eventdata.tolist()[4][1]
Orca_Dlevel = eventdata.tolist()[5][1]
Orca_DSL = eventdata.tolist()[6][1]
num_crit = eventdata.tolist()[7][1]
scenario_selector = 0
resilience_withstand = []
CaseName = 'Case' + str(scenario_selector)

# case 0
SOC = 1
ORCA_load_level = 1
WL_HBC = 70
WL_PC = 70

A, nodename, nodedata, edgedata, prioritynodes, G = loadbasecase_func(
    nodefile, edgefile)

G2 = G.copy()
adj2 = A
nodes2 = nodename
nodedata2 = nodedata
load_LA_max = str(max(list(map(float, load_LA))))
load_MT_max = str(max(list(map(float, load_MT))))
load_NT_max = str(max(list(map(float, load_NT))))
load_13m_max = str(max(list(map(float, load_13m))))

for i in range(19, 27):
    nodedata[2][1][i] = '0'
    nodedata2[2][1][i] = '0'

for i in range(30, 38):
    nodedata[2][1][i] = '0'
    nodedata2[2][1][i] = '0'

for i in range(39, 46):
    nodedata[2][1][i] = '0'
    nodedata2[2][1][i] = '0'
# make max load

nodedata[2][1][18] = load_LA_max
nodedata[2][1][28] = load_MT_max
nodedata[2][1][30] = load_NT_max
nodedata[2][1][47] = load_13m_max
# replace load data

for n in range(0, 15):
    nodedata[2][1][18] = load_LA[n]
    nodedata[2][1][28] = load_MT[n]
    nodedata[2][1][30] = load_NT[n]
    nodedata[2][1][47] = load_13m[n]

if SOC == 0:
    print('Case run without Batteryu at Eyak')
else:
    print("Case {} run with Battery at Eyak with SOC = {}".format(n, SOC*100))

# change nodetable for each area load = max
# Linli - comment
# compute topolical factors


# NO AHP FOR NOW
RunAHP = 1

G, Topovec = topo_extract(G, nodename)
G2, Topovec2 = topo_extract(G2, nodes2)

if Topovec == Topovec2:
    Alt1Top = 1
    Alt2Top = 1
else:
    Alt1 = RunAHP
    Alt1 = RunAHP

P = nx.draw(G)
plt.show()