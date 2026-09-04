with open(r"C:\Users\abi86\Downloads\DSU\DSU-07\src\pages\Dashboard.jsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "doctoral Advisory" in line or "MoM" in line or "course code" in line or "course_code" in line or "first dac" in line.lower():
        print(f"Line {i+1}: {line.strip()}")
