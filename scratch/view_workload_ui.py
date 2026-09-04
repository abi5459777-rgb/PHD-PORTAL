with open(r"C:\Users\abi86\Downloads\DSU\DSU-06\src\pages\Dashboard.jsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i in range(6450, 6560):
    if i < len(lines):
        print(f"{i+1}: {lines[i].strip()}")
