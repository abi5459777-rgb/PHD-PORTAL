import os

phrases = [
    "Course Work Allocation",
    "doctoral Advisory Meeting",
    "Propose DAC Meeting",
    "Generate Course Code",
    "Upload MoM"
]

src_dir = r"C:\Users\abi86\Downloads\DSU\DSU-07\src"

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith((".jsx", ".js", ".css")):
            path = os.path.join(root, file)
            try:
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                found = []
                for phrase in phrases:
                    if phrase.lower() in content.lower():
                        found.append(phrase)
                if found:
                    print(f"File: {path}")
                    print(f"  Found phrases: {found}")
            except Exception as e:
                pass
