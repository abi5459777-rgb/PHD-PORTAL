with open(r"C:\Users\abi86\Downloads\DSU\DSU-06\src\pages\Dashboard.jsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "<thead" in line:
        # print line and the next few lines
        print(f"Line {i+1}: {line.strip()}")
        for offset in range(1, 4):
            if i + offset < len(lines):
                print(f"  +{offset}: {lines[i+offset].strip()}")
