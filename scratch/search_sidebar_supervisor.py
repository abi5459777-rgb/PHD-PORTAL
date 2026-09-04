with open(r"C:\Users\abi86\Downloads\DSU\DSU-07\src\layouts\Sidebar.jsx", "r", encoding="utf-8") as f:
    content = f.read()

print("File: Sidebar.jsx")
if "first dac" in content.lower():
    print("Found 'first dac' in Sidebar.jsx")
else:
    print("Did NOT find 'first dac' in Sidebar.jsx")

# print the whole sidebar content
lines = content.splitlines()
for idx, line in enumerate(lines[:120]):
    print(f"{idx+1}: {line}")
