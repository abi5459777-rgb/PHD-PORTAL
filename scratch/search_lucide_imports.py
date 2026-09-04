with open(r"C:\Users\abi86\Downloads\DSU\DSU-07\src\pages\Dashboard.jsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i in range(11, 22):
    print(f"{i+1}: {lines[i].strip()}")
