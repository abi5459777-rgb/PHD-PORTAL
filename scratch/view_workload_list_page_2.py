with open(r"C:\Users\abi86\Downloads\DSU\DSU-06\src\pages\Dashboard.jsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

with open(r"C:\Users\abi86\Downloads\DSU\DSU-06\scratch\workload_out.txt", "w", encoding="utf-8") as out:
    for i in range(6680, 6850):
        if i < len(lines):
            out.write(f"{i+1}: {lines[i]}")
print("Saved workload code range.")
