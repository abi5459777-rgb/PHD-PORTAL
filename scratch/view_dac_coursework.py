with open(r"C:\Users\abi86\Downloads\DSU\DSU-07\src\pages\DacCoursework.jsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

with open(r"C:\Users\abi86\Downloads\DSU\DSU-07\scratch\dac_coursework_300.txt", "w", encoding="utf-8") as out:
    for idx, line in enumerate(lines[:300]):
        out.write(f"{idx+1}: {line}")
print("Saved first 300 lines of DacCoursework.jsx.")
