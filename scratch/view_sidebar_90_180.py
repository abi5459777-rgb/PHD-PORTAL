with open(r"C:\Users\abi86\Downloads\DSU\DSU-07\src\layouts\Sidebar.jsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

with open(r"C:\Users\abi86\Downloads\DSU\DSU-07\scratch\sidebar_90_180.txt", "w", encoding="utf-8") as out:
    for i in range(90, 180):
        if i < len(lines):
            out.write(f"{i+1}: {lines[i]}")
print("Saved Sidebar.jsx 90-180 range.")
