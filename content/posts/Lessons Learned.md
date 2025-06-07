---
title: Lessons Learned
date: 2025-06-06
draft: false
tags:
  - cybrwlf
  - blog
---

## Lessons Learned

This post documents the challenges and solutions encountered while updating the automation scripts for my Hugo blog. The goal was to streamline the process of moving notes from Obsidian to Hugo and then deploying them to GitHub, including handling images.

---

### Initial Setup & The Mysterious Missing Images

When I first set up the script, everything seemed okay, but **images weren't showing up** on the deployed site. I'd embed them in Obsidian like this: `![[20240103Capture2.jpg]]`.

The problem was that the Python script, `images.py`, was **only looking for `.png` files**! My Obsidian notes mostly contained `.jpg` images, especially those "Pasted images" from screenshots. The `re.findall` regular expression was too specific.

**Original (problematic) regex:**
`re.findall(r'\[\[([^]]*\.png)\]\]', content)`

**Solution:** I had to update the regex to include `.jpg`, `.jpeg`, and other common image formats, also making it case-insensitive to catch `.JPG` or `.PNG`.

**Updated (fixed) regex:**
`re.findall(r'\[\[([^]]*\.(?:png|jpg|jpeg|gif|bmp|webp))\]\]', content, re.IGNORECASE)`

This change immediately fixed the issue of images not being copied.

Here's an example of a successful image copy after the fix:

![Image of a fixed regex](https://i.sstatic.net/plEgn.png)

---

### Understanding Image Paths: The Obsidian Vault Structure

Another hurdle was figuring out exactly where Obsidian was storing my images. Initially, I thought they might be in a subfolder like `Attachments` within the vault. So, my script was trying to find them at a path like:

`C:\Users\cybrwlf\Documents\Obsidian Vault\Attachments\image.jpg`

However, after using Obsidian's "Show in system explorer" option, I found that images like `20240103Capture2.jpg` were being saved **directly in the vault's root**: `C:\Users\cybrwlf\Documents\Obsidian Vault`.

**Solution:** I updated the `attachments_dir` variable in the Python script to point directly to the Obsidian vault's root:

`attachments_dir = r"C:\Users\cybrwlf\Documents\Obsidian Vault"`

This ensures the Python script looks for images in the correct place.

---

### Streamlining Script Execution: Python Script Location

Initially, the PowerShell script hardcoded the path to `images.py`. This isn't ideal for portability or if the script moved.

**Old (hardcoded) approach:**
`$pythonScriptPath = "C:\Users\cybrwlf\Documents\cybrwlfblog\images.py"`

**Solution:** We refactored the PowerShell "megascript" to **dynamically determine its own directory** and then set the path to `images.py` relative to that. This relies on the `images.py` script always being in the *same folder* as the PowerShell script.

**New (dynamic) approach in PowerShell:**
```powershell
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $ScriptDir # Change to the script's directory
$pythonScriptPath = Join-Path $ScriptDir "images.py"