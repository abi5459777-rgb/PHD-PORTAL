import sys
sys.stdout.reconfigure(encoding='utf-8')

file_path = r"C:\Users\abi86\Downloads\DSU\DSU-07\src\pages\Dashboard.jsx"

with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "const scholarDetailsDb" in line or "let scholarDetailsDb" in line or "scholarDetailsDb =" in line:
        print(f"Line {i+1}: {line.strip()}")
