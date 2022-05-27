# load inventory_items as dataframe
import csv,json, os
import pandas as pd
os.chdir('/Users/alexchandler/BerryTreeGame') #change to python script directory
df = pd.read_csv('data/csv-files/inventory_items.csv', dtype='object')
#saves the inventory_items df in json format to 'data/json-files/inventory_items.json'
result = df.to_json(orient = "index")
parsed = json.loads(result)
jsonFilePath='data/json-files/inventory_items.json'
with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
    jsonf.write(json.dumps(parsed, indent=4))
print('saved to '+jsonFilePath)

df = pd.read_csv('data/csv-files/character-stats.csv', dtype='object')

#saves the character-stats df in json format to 'data/json-files/inventory_items.json'
result = df.to_json(orient = "index")
parsed = json.loads(result)
jsonFilePath='data/json-files/character-stats.json'
with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
    jsonf.write(json.dumps(parsed, indent=4))
print('saved to '+jsonFilePath)

df = pd.read_csv('data/csv-files/equipment.csv', dtype='object')

#saves the character-stats df in json format to 'data/json-files/inventory_items.json'
result = df.to_json(orient = "index")
parsed = json.loads(result)
jsonFilePath='data/json-files/equipment.json'
with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
    jsonf.write(json.dumps(parsed, indent=4))
print('saved to '+jsonFilePath)
