with open(r"C:\Users\abi86\Downloads\DSU\DSU-06\src\pages\Dashboard.jsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "Kamalesh" in line or "schoolDacs" in line or "schoolVivas" in line or "schoolColloquiums" in line or "inchSubmissions" in line or "schoolSynopsis" in line:
        if "useState" in line or "Kamalesh" in line:
            print(f"Line {i+1}: {line.strip()}")
