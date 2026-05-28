project_html_path = r"c:\Users\JOSHUA\Desktop\e-Wash final\e-Wash\project.html"

with open(project_html_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

# Let's locate the index of Roles & Daily Work Plan section
# We know Roles section starts with <div class="roles-workplan-section">
# and ends right before <div class="uf60-logic-section">

roles_start_idx = -1
roles_end_idx = -1

for idx, line in enumerate(lines):
    if 'class="roles-workplan-section"' in line:
        roles_start_idx = idx
    if 'class="uf60-logic-section"' in line and roles_start_idx != -1 and roles_end_idx == -1:
        # We want to keep the spacing right before uf60-logic-section, or delete up to it.
        # Let's look backward from uf60-logic-section to find the start of the spacing div.
        # Spacing div is:
        # <div class="super-sol-projects-spacing" style="height: 60px"></div>
        # Let's delete up to the class="uf60-logic-section" start, minus the spacing.
        # Actually, let's trace the closing tag of roles-workplan-section.
        # The roles-workplan-section starts at roles_start_idx.
        # Let's count open/close divs to find the exact closing tag of roles-workplan-section.
        pass

# Let's count divs from roles_start_idx to find the closing div of roles-workplan-section
open_divs = 0
for idx in range(roles_start_idx, len(lines)):
    line = lines[idx]
    # Simple count of <div and </div
    open_divs += line.count("<div")
    open_divs -= line.count("</div")
    if open_divs == 0:
        roles_end_idx = idx + 1 # Include the closing tag line
        break

print(f"Roles section starts at line {roles_start_idx + 1} and ends at line {roles_end_idx}")

# The spacing after roles section starts around roles_end_idx and ends before uf60-logic-section
# Let's see if there is a spacing block
spacing_end_idx = roles_end_idx
for idx in range(roles_end_idx, len(lines)):
    if 'class="uf60-logic-section"' in lines[idx]:
        spacing_end_idx = idx
        break

# Now let's find the second block: Rainfall section to end of roadmap-section
# Preceding spacing is right before <div class="rainfall-section">
rainfall_spacing_start = -1
for idx in range(spacing_end_idx, len(lines)):
    if 'class="rainfall-section"' in lines[idx]:
        # Look backwards for the spacing div
        for j in range(idx - 1, spacing_end_idx, -1):
            if 'class="super-sol-projects-spacing"' in lines[j]:
                rainfall_spacing_start = j
                break
        if rainfall_spacing_start == -1:
            rainfall_spacing_start = idx
        break

# The end of roadmap section: we want to delete up to <!-- roadmap-section -->\n              </div>
roadmap_end_idx = -1
for idx in range(rainfall_spacing_start, len(lines)):
    if '<!-- roadmap-section -->' in lines[idx]:
        if idx + 1 < len(lines) and '</div>' in lines[idx + 1]:
            roadmap_end_idx = idx + 2
            break

print(f"Rainfall/Roadmap block starts at line {rainfall_spacing_start + 1} and ends at line {roadmap_end_idx}")

if roles_start_idx != -1 and roles_end_idx != -1 and rainfall_spacing_start != -1 and roadmap_end_idx != -1:
    # Perform deletion
    # We delete roles-workplan-section (from roles_start_idx to spacing_end_idx)
    # And then we delete rainfall to roadmap (from rainfall_spacing_start to roadmap_end_idx)
    # Note: to do this cleanly, we delete the later block first so indices don't shift!
    new_lines = lines[:rainfall_spacing_start] + lines[roadmap_end_idx:]
    new_lines = new_lines[:roles_start_idx] + new_lines[spacing_end_idx:]
    
    with open(project_html_path, "w", encoding="utf-8") as f:
        f.write("".join(new_lines))
    print("Successfully removed the unwanted sections from project.html.")
else:
    print("Error: Could not locate the section indices.")
