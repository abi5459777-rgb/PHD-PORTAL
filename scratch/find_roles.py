import sys
sys.stdout.reconfigure(encoding='utf-8')

file_path = r"C:\Users\abi86\Downloads\DSU\DSU-07\src\pages\Dashboard.jsx"

with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "role ===" in line or "role==" in line:
        print(f"Line {i+1}: {line.strip()}")
    elif "Dean of Research" in line and ("render" in line.lower() or "dashboard" in line.lower() or "case" in line.lower()):
        print(f"Line {i+1} (Research): {line.strip()}")
    elif "Dean of School" in line and ("render" in line.lower() or "dashboard" in line.lower() or "case" in line.lower()):
        print(f"Line {i+1} (School): {line.strip()}")
