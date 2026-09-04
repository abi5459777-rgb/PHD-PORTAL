with open(r"C:\Users\abi86\Downloads\DSU\DSU-06\src\pages\Dashboard.jsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "setActiveVcApproval(null)" in line or "Enter reason for returning" in line or "Request successfully signed" in line:
        print(f"Line {i+1}: {line.strip()}")
        # print next 2 lines
        for offset in range(1, 4):
            if i + offset < len(lines):
                print(f"  +{offset}: {lines[i+offset].strip()}")
