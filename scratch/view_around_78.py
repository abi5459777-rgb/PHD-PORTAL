with open(r"C:\Users\abi86\Downloads\DSU\DSU-07\src\pages\Dashboard.jsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

with open(r"C:\Users\abi86\Downloads\DSU\DSU-07\scratch\dashboard_75_90.txt", "w", encoding="utf-8") as out:
    for i in range(75, 90):
        if i < len(lines):
            out.write(f"{i+1}: {lines[i]}")
print("Saved dashboard 75-90 range.")
