import re

file_path = r"C:\Users\abi86\Downloads\DSU\DSU-07\src\pages\Dashboard.jsx"

with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")

# Search for functions or rendering related to Dean of Research / Scholar verification
for i, line in enumerate(lines):
    if "getScholarVerificationData" in line or "handleVerifyAction" in line or "dsu_dean_scholar_details" in line:
        print(f"Line {i+1}: {line.strip()}")
