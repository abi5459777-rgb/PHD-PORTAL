import os

query = "course code"
src_dir = r"C:\Users\abi86\Downloads\DSU\DSU-07\src"

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith((".jsx", ".js")):
            path = os.path.join(root, file)
            try:
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                if query.lower() in content.lower():
                    print(f"File: {path}")
                    # print matching lines
                    lines = content.splitlines()
                    for idx, line in enumerate(lines):
                        if query.lower() in line.lower():
                            print(f"  Line {idx+1}: {line.strip()}")
            except Exception as e:
                pass
