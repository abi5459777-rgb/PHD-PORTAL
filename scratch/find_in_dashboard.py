import sys

with open(r"C:\Users\abi86\Downloads\DSU\DSU-06\src\pages\Dashboard.jsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

search_terms = ["Examiner Panel", "Thesis Evaluation", "Final PhD", "vc", "VC", "R. KUMAR", "Kumar"]
found = {}
for i, line in enumerate(lines):
    for term in search_terms:
        if term in line:
            if term not in found:
                found[term] = []
            found[term].append((i+1, line.strip()))

with open(r"C:\Users\abi86\Downloads\DSU\DSU-06\scratch\search_results.txt", "w", encoding="utf-8") as out:
    for term, occurrences in found.items():
        out.write(f"--- Term: '{term}' (Total {len(occurrences)}) ---\n")
        for line_num, text in occurrences:
            out.write(f"Line {line_num}: {text}\n")
print("Done searching.")
