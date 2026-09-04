import os

phrases = [
    "External Members",
    "Internal Members",
    "Course Work Allocation",
    "doctoral Advisory Meeting",
    "Upload MoM",
    "Generate Course Code",
    "Assigned course"
]

files_to_check = [
    r"C:\Users\abi86\Downloads\DSU\DSU-07\src\pages\DAC.jsx",
    r"C:\Users\abi86\Downloads\DSU\DSU-07\src\pages\DacCoursework.jsx",
    r"C:\Users\abi86\Downloads\DSU\DSU-07\src\pages\Coursework.jsx"
]

for file in files_to_check:
    if os.path.exists(file):
        try:
            with open(file, "r", encoding="utf-8") as f:
                content = f.read()
            found = []
            for p in phrases:
                if p.lower() in content.lower():
                    found.append(p)
            print(f"File: {file}")
            print(f"  Found: {found}")
        except Exception as e:
            print(f"Error reading {file}: {e}")
    else:
        print(f"File does not exist: {file}")
