with open(r"C:\Users\abi86\Downloads\DSU\DSU-06\src\pages\Dashboard.jsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

in_workload = False
count = 0
for i, line in enumerate(lines):
    if "view === 'workload'" in line:
        in_workload = True
    if in_workload:
        print(f"Line {i+1}: {line.strip()}")
        count += 1
        if count > 80:
            break
