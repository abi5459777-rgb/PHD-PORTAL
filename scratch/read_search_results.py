with open(r"C:\Users\abi86\Downloads\DSU\DSU-06\scratch\search_results.txt", "r", encoding="utf-8") as f:
    content = f.read()

# Let's search for lines matching VC or vc
for line in content.splitlines():
    if "Term: 'vc'" in line or "Term: 'VC'" in line or "Term: 'R. KUMAR'" in line:
        print(line)
    elif "Line" in line and ("role === 'vc'" in line or "user_role === 'vc'" in line or "Welcome, Dr. R. Kumar" in line or "WELCOME, DR. R. KUMAR" in line or "vc" in line.lower()):
        # Let's limit output to lines that are interesting
        print(line[:120])
