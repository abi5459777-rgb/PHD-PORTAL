with open(r"C:\Users\abi86\Downloads\DSU\DSU-07\src\pages\DacCoursework.jsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

with open(r"C:\Users\abi86\Downloads\DSU\DSU-07\scratch\dac_coursework_end.txt", "w", encoding="utf-8") as out:
    for idx, line in enumerate(lines[300:]):
        out.write(f"{301+idx}: {line}")
print("Saved DacCoursework.jsx end.")
