import os

search_dir = r"C:\Users\abi86\Downloads\DSU\DSU-06\src"
search_term = "dsu_vc_notifications"

for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith((".js", ".jsx", ".json", ".html")):
            path = os.path.join(root, file)
            try:
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                if search_term in content:
                    print(f"Found in: {path}")
                    # print line numbers
                    lines = content.splitlines()
                    for idx, line in enumerate(lines):
                        if search_term in line:
                            print(f"  Line {idx+1}: {line.strip()}")
            except Exception as e:
                pass
