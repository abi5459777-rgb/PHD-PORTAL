with open(r"C:\Users\abi86\Downloads\DSU\DSU-07\src\pages\Dashboard.jsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i in range(727, len(lines)):
    line = lines[i]
    if "first dac" in line.lower() or "generate" in line.lower() or "code" in line.lower():
        print(f"Line {i+1}: {line.strip()}")
