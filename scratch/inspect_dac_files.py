import os

files_to_check = [
    r"C:\Users\abi86\Downloads\DSU\DSU-07\src\pages\DAC.jsx",
    r"C:\Users\abi86\Downloads\DSU\DSU-07\src\pages\DacCoursework.jsx",
    r"C:\Users\abi86\Downloads\DSU\DSU-07\src\pages\Coursework.jsx"
]

for file in files_to_check:
    if os.path.exists(file):
        print(f"=== File: {file} ===")
        with open(file, "r", encoding="utf-8") as f:
            lines = f.readlines()
        for idx in range(min(50, len(lines))):
            print(f"{idx+1}: {lines[idx].strip()}")
    else:
        print(f"File not found: {file}")
