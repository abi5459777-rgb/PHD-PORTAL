import re
import sys

def search_file(filepath, query):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    for idx, line in enumerate(lines, 1):
        if query.lower() in line.lower():
            print(f"{idx}: {line.strip()}")

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: search_dashboard.py <query>")
    else:
        search_file(r'C:\Users\abi86\Downloads\DSU\DSU-06\src\pages\Dashboard.jsx', sys.argv[1])
