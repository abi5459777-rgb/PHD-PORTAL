import sys
sys.stdout.reconfigure(encoding='utf-8')

file_path = r"C:\Users\abi86\Downloads\DSU\DSU-07\src\pages\Dashboard.jsx"

with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
    lines = f.readlines()

print("--- RANGE 6650 to 6700 ---")
for idx in range(6649, min(6700, len(lines))):
    print(f"{idx+1}: {lines[idx]}", end="")

print("\n--- RANGE 7000 to 7100 ---")
for idx in range(6999, min(7100, len(lines))):
    print(f"{idx+1}: {lines[idx]}", end="")
