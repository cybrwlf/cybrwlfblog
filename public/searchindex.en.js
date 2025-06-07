var relearn_searchindex = [
  {
    "breadcrumb": "hugo-theme-relearn \u003e \rTags",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Tag :: Blog",
    "uri": "/tags/blog/index.html"
  },
  {
    "breadcrumb": "hugo-theme-relearn \u003e \rTags",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Tag :: Cybrwlf",
    "uri": "/tags/cybrwlf/index.html"
  },
  {
    "breadcrumb": "",
    "content": "",
    "description": "",
    "tags": [],
    "title": "hugo-theme-relearn",
    "uri": "/index.html"
  },
  {
    "breadcrumb": "hugo-theme-relearn \u003e \rPosts",
    "content": "Lessons Learned This post documents the challenges and solutions encountered while updating the automation scripts for my Hugo blog. The goal was to streamline the process of moving notes from Obsidian to Hugo and then deploying them to GitHub, including handling images.\nInitial Setup \u0026 The Mysterious Missing Images When I first set up the script, everything seemed okay, but images weren’t showing up on the deployed site. I’d embed them in Obsidian like this: ![[20240103Capture2.jpg]].\nThe problem was that the Python script, images.py, was only looking for .png files! My Obsidian notes mostly contained .jpg images, especially those “Pasted images” from screenshots. The re.findall regular expression was too specific.\nOriginal (problematic) regex: re.findall(r'\\[\\[([^]]*\\.png)\\]\\]', content)\nSolution: I had to update the regex to include .jpg, .jpeg, and other common image formats, also making it case-insensitive to catch .JPG or .PNG.\nUpdated (fixed) regex: re.findall(r'\\[\\[([^]]*\\.(?:png|jpg|jpeg|gif|bmp|webp))\\]\\]', content, re.IGNORECASE)\nThis change immediately fixed the issue of images not being copied.\nHere’s an example of a successful image copy after the fix:\nUnderstanding Image Paths: The Obsidian Vault Structure Another hurdle was figuring out exactly where Obsidian was storing my images. Initially, I thought they might be in a subfolder like Attachments within the vault. So, my script was trying to find them at a path like:\nC:\\Users\\cybrwlf\\Documents\\Obsidian Vault\\Attachments\\image.jpg\nHowever, after using Obsidian’s “Show in system explorer” option, I found that images like 20240103Capture2.jpg were being saved directly in the vault’s root: C:\\Users\\cybrwlf\\Documents\\Obsidian Vault.\nSolution: I updated the attachments_dir variable in the Python script to point directly to the Obsidian vault’s root:\nattachments_dir = r\"C:\\Users\\cybrwlf\\Documents\\Obsidian Vault\"\nThis ensures the Python script looks for images in the correct place.\nStreamlining Script Execution: Python Script Location Initially, the PowerShell script hardcoded the path to images.py. This isn’t ideal for portability or if the script moved.\nOld (hardcoded) approach: $pythonScriptPath = \"C:\\Users\\cybrwlf\\Documents\\cybrwlfblog\\images.py\"\nSolution: We refactored the PowerShell “megascript” to dynamically determine its own directory and then set the path to images.py relative to that. This relies on the images.py script always being in the same folder as the PowerShell script.\nNew (dynamic) approach in PowerShell:\n$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition Set-Location $ScriptDir # Change to the script's directory $pythonScriptPath = Join-Path $ScriptDir \"images.py\"",
    "description": "Lessons Learned This post documents the challenges and solutions encountered while updating the automation scripts for my Hugo blog. The goal was to streamline the process of moving notes from Obsidian to Hugo and then deploying them to GitHub, including handling images.\nInitial Setup \u0026 The Mysterious Missing Images When I first set up the script, everything seemed okay, but images weren’t showing up on the deployed site. I’d embed them in Obsidian like this: ![[20240103Capture2.jpg]].",
    "tags": [
      "Cybrwlf",
      "Blog"
    ],
    "title": "Lessons Learned",
    "uri": "/posts/lessons-learned/index.html"
  },
  {
    "breadcrumb": "hugo-theme-relearn",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Posts",
    "uri": "/posts/index.html"
  },
  {
    "breadcrumb": "hugo-theme-relearn",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Tags",
    "uri": "/tags/index.html"
  },
  {
    "breadcrumb": "hugo-theme-relearn \u003e \rPosts",
    "content": "Setup Posts Install Obsidian on computer Create “posts” folder, this will be what’s published This is created in C:\\Users\\ [USER] \\Documents\\Obsidian Vault\\posts-test\nPublishing Install Hugo Pre-reqs Install Git: https://github.com/git-guides/install-git Install Go: https://go.dev/dl/ !",
    "description": "Setup Posts Install Obsidian on computer Create “posts” folder, this will be what’s published This is created in C:\\Users\\ [USER] \\Documents\\Obsidian Vault\\posts-test\nPublishing Install Hugo Pre-reqs Install Git: https://github.com/git-guides/install-git Install Go: https://go.dev/dl/ !",
    "tags": [
      "Cybrwlf",
      "Blog"
    ],
    "title": "Test First Post",
    "uri": "/posts/test-first-post/index.html"
  },
  {
    "breadcrumb": "hugo-theme-relearn",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Categories",
    "uri": "/categories/index.html"
  }
]
