with open(r"C:\Users\abi86\Downloads\DSU\DSU-07\src\layouts\Sidebar.jsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "first dac" in line.lower() or "dac" in line.lower():
        print(f"Line {i+1}: {line.strip()}")
