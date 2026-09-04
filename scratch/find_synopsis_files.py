with open(r"C:\Users\abi86\Downloads\DSU\DSU-06\src\pages\Dashboard.jsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "synopsis_mom" in line or "Synopsis Evaluation" in line or "progress_report_sem5" in line:
        print(f"Line {i+1}: {line.strip()}")
