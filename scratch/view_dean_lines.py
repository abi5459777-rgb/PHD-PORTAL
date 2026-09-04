import sys
sys.stdout.reconfigure(encoding='utf-8')

file_path = r"C:\Users\abi86\Downloads\DSU\DSU-07\src\pages\Dashboard.jsx"

with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
    lines = f.readlines()

start = 5700
end = 6050

for idx in range(start, min(end, len(lines))):
    print(f"{idx+1}: {lines[idx]}", end="")
