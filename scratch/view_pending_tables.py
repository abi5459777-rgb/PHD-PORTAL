with open(r"C:\Users\abi86\Downloads\DSU\DSU-06\src\pages\Dashboard.jsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

with open(r"C:\Users\abi86\Downloads\DSU\DSU-06\scratch\pending_tables.txt", "w", encoding="utf-8") as out:
    for i in range(210, 250):
        if i < len(lines):
            out.write(f"{i+1}: {lines[i]}")
print("Saved pending tables range.")
