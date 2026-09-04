with open(r"C:\Users\abi86\Downloads\DSU\DSU-06\src\pages\Dashboard.jsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "useEffect" in line:
        print(f"Line {i+1}: {line.strip()}")
        # print next 10 lines
        for offset in range(1, 15):
            if i + offset < len(lines):
                print(f"  +{offset}: {lines[i+offset].strip()}")
