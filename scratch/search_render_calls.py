with open(r"C:\Users\abi86\Downloads\DSU\DSU-07\src\pages\Dashboard.jsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "renderFirstDacSupervisorWorkspace" in line:
        print(f"Line {i+1}: {line.strip()}")
