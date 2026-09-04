with open(r"C:\Users\abi86\Downloads\DSU\DSU-07\src\pages\Coursework.jsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

with open(r"C:\Users\abi86\Downloads\DSU\DSU-07\scratch\coursework_150.txt", "w", encoding="utf-8") as out:
    for idx, line in enumerate(lines[:150]):
        out.write(f"{idx+1}: {line}")
print("Saved first 150 lines of Coursework.jsx.")
