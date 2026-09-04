import re

file_path = r"src/pages/ResearchInnovation.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    code = f.read()

# Replace component name
code = code.replace("export default function Home() {", "export default function ResearchInnovation() {")

# Remove the lifecycle sidebar header and tabs map
sidebar_pattern = r'\{\/\* Header: Life Cycle \*\/\}[\s\S]*?\{\/\* Header: Life Cycle \*\/\}[\s\S]*?\}\]\.map\(tab => \([\s\S]*?\)\)'
# Let's search for the header and remove the block
code = re.sub(r'\{\/\* Header: Life Cycle \*\/\}[\s\S]*?\}\]\.map\(tab => \([\s\S]*?\)\)', '', code)
code = re.sub(r'\{\/\* Header: Life Cycle \*\/\}[\s\S]*?\}\]\.map\([\s\S]*?\)', '', code)

# Let's make sure "PhD Portal Lifecycle" is removed from sidebar
code = code.replace("""            {/* Header: Life Cycle */}
            <div className="bg-[#001c4f] text-white px-5 py-3.5 text-xs font-black uppercase tracking-wider border-t border-slate-200 text-left">
              PhD Portal Lifecycle
            </div>""", "")

# Let's remove the tabs map specifically:
code = re.sub(r'\{\s*id:\s*\'phd-admissions-workflow\'[\s\S]*?\}\s*\]\.map\(tab\s*=>\s*\([\s\S]*?\)\)', '', code)

# Let's remove the stage tab panels:
# We will search for phd-admissions-workflow tab panel and delete everything from it to thesis-defense-workflow panel
# We can search for '{/* 8. I. PHD ADMISSIONS WORKFLOW */}' up to '{/* 15. VIII. THESIS DEFENSE WORKFLOW */}' and remove
# Wait! Let's find the start of phd-admissions-workflow and the end of thesis-defense-workflow tab block
admissions_start = code.find("{/* 8. I. PHD ADMISSIONS WORKFLOW */}")
if admissions_start == -1:
    admissions_start = code.find("{/* 8. I. PHD ADMISSIONS WORKFLOW */}")

defense_end = code.find("activeTab === 'thesis-defense-workflow'")
if defense_end != -1:
    # Find the closing tag or block of defense tab.
    # The defense tab is:
    # activeTab === 'thesis-defense-workflow' && ( ... )
    # Let's find the closing Parentheses-Bracket or end of it.
    # It ends before: </motion.div>\n            </AnimatePresence>
    motion_div_end = code.find("</motion.div>", defense_end)
    # The defense block ends with:
    #                 )}
    # before motion_div_end. Let's find the last ')}' before motion_div_end.
    last_block_end = code.rfind(")}", defense_end, motion_div_end)
    if last_block_end != -1:
        # We want to remove from admissions_start to last_block_end + 2
        code = code[:admissions_start] + code[last_block_end + 2:]
        print("Successfully removed stage workflow tab panels!")

# Let's update navigation menu links in ResearchInnovation.jsx:
# Replace group buttons with flat links for Home, Research & Innovation, and PhD Login Portal
desktop_nav_start = code.find('<div className="hidden lg:flex items-center w-full justify-between select-none text-xs font-extrabold uppercase text-white">')
desktop_nav_end = code.find('</div>', desktop_nav_start)
# Let's look for a block that matches this and replace it
# Let's print desktop nav block to inspect it
if desktop_nav_start != -1 and desktop_nav_end != -1:
    print("Found desktop nav block!")

# Let's replace the whole header nav in ResearchInnovation.jsx with a flat layout:
old_nav_links = """            <div className="flex items-center gap-2">
              {/* ABOUT US */}
              <div className="relative group">
                <button className="flex items-center gap-1.5 px-4 py-4 hover:bg-white/10 hover:text-white transition outline-none">
                  About Us <ChevronDown className="h-3.5 w-3.5 text-[#D4AF37]" />
                </button>
                <div className="absolute left-0 hidden group-hover:block bg-white text-slate-700 border border-slate-200 py-1.5 w-56 shadow-xl z-50 rounded-b-xl normal-case">
                  <button onClick={() => handleTabChange('about-us')} className="w-full text-left block px-4 py-2.5 hover:bg-slate-50 hover:text-[#7B1E3A] font-semibold transition">About Office</button>
                  <button onClick={() => handleTabChange('vision-mission')} className="w-full text-left block px-4 py-2.5 hover:bg-slate-50 hover:text-[#7B1E3A] font-semibold transition">Vision & Mission</button>
                  <button onClick={() => handleTabChange('organogram')} className="w-full text-left block px-4 py-2.5 hover:bg-slate-50 hover:text-[#7B1E3A] font-semibold transition">University Organogram</button>
                </div>
              </div>

              {/* RESEARCH & INNOVATION */}
              <div className="relative group">
                <button className="flex items-center gap-1.5 px-4 py-4 hover:bg-white/10 hover:text-white transition outline-none">
                  Research & Innovation <ChevronDown className="h-3.5 w-3.5 text-[#D4AF37]" />
                </button>
                <div className="absolute left-0 hidden group-hover:block bg-white text-slate-700 border border-slate-200 py-1.5 w-56 shadow-xl z-50 rounded-b-xl normal-case">
                  <button onClick={() => handleTabChange('about-us')} className="w-full text-left block px-4 py-2.5 hover:bg-slate-50 hover:text-[#7B1E3A] font-semibold transition">Research Cell Overview</button>
                  <button onClick={() => handleTabChange('policies')} className="w-full text-left block px-4 py-2.5 hover:bg-slate-50 hover:text-[#7B1E3A] font-semibold transition">Research Policies</button>
                  <button onClick={() => handleTabChange('supervisors')} className="w-full text-left block px-4 py-2.5 hover:bg-slate-50 hover:text-[#7B1E3A] font-semibold transition">Approved Supervisors</button>
                  <button onClick={() => handleTabChange('forms')} className="w-full text-left block px-4 py-2.5 hover:bg-slate-50 hover:text-[#7B1E3A] font-semibold transition">Downloadable Forms</button>
                </div>
              </div>
            </div>"""

new_nav_links = """            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/')} className="px-4 py-4 hover:bg-white/10 hover:text-white transition outline-none">
                Home
              </button>
              <button onClick={() => navigate('/research-innovation')} className="px-4 py-4 hover:bg-white/10 hover:text-white transition outline-none border-b-2 border-[#D4AF37]">
                Research & Innovation
              </button>
            </div>"""

code = code.replace(old_nav_links, new_nav_links)

# Let's replace mobile menu navigation links as well:
old_mobile_links = """            <button onClick={() => handleTabChange('about-us')} className="text-left py-2 border-b border-slate-100 hover:text-[#7B1E3A]">About Research Cell</button>
            <button onClick={() => handleTabChange('domains')} className="text-left py-2 border-b border-slate-100 hover:text-[#7B1E3A]">Research Areas</button>
            <button onClick={() => handleTabChange('supervisors')} className="text-left py-2 border-b border-slate-100 hover:text-[#7B1E3A]">Approved Supervisors</button>
            <button onClick={() => handleTabChange('forms')} className="text-left py-2 border-b border-slate-100 hover:text-[#7B1E3A] flex items-center gap-1">Downloadable Forms</button>"""

new_mobile_links = """            <button onClick={() => { navigate('/'); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-slate-100 hover:text-[#7B1E3A]">Home</button>
            <button onClick={() => { navigate('/research-innovation'); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-slate-100 hover:text-[#7B1E3A]">Research & Innovation</button>"""

code = code.replace(old_mobile_links, new_mobile_links)

# Also let's redirect seal logo click (in both Home and ResearchInnovation pages) to Home (navigate('/'))
code = code.replace("onClick={() => handleTabChange('about-us')}", "onClick={() => navigate('/')}")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(code)

print("Modification complete!")
