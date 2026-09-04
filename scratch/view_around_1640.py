with open(r"C:\Users\abi86\Downloads\DSU\DSU-07\src\pages\Dashboard.jsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

with open(r"C:\Users\abi86\Downloads\DSU\DSU-07\scratch\dashboard_1630_1680.txt", "w", encoding="utf-8") as out:
    for i in range(1630, 1680):
        if i < len(lines):
            out.write(f"{i+1}: {lines[i]}")
print("Saved dashboard 1630-1680 range.")
