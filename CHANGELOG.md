# Changelog

## 1.6.1
- Add additional file icons:
  - Excel
  - Maven
  - Spring
  - SQL
  - Word

## 1.6.0
- Bump version to fix incorrect publish

## 1.5.0
- Bump atom target version to 1.13
- Fix typo in README
- Fix deprecation warnings
  - Remove shadow psudo-selector
  - Prepend syntax selectors with syntax--
- Add additional icons:
  - .babelrc
  - .eslintrc
  - .gitmodules
  - rollup.config.js
  - yarn.lock
  - yarn.clean

## 1.4.0
- Bump atom target version to 1.12
- Minify icons
- Update scrollbars
- Update workspace.less
- Use npm icon for .npmrc
- Change preview settings icons background colors for todo-show package
- Correct link to icon mapping file
- Update autocomplete-plus labels
- Add icons for .bat,.cmd

## 1.3.2
- Update status bar styles for 1.8

## 1.3.1
- Tone down styles for tree-view-git-branch
- Update terminal-plus styles

## 1.3.0
- Add styles for [tree-view-git-branch](https://atom.io/packages/tree-view-git-branch)
- Set background colors for terminal plus
- Update selected file state
- Fix key binding colors #297
- Adjust scrollbars #271
- Add missing base-color variable
- Add .editorconfig file
- Add info icon for About tab
- Fix conflict with git-control #301

## 1.2.3
- Adjust project find result for compact #289
- Add icons for mp3 and ogg audio files
- Add ionic icon
- Update Objective C files #294
- Add Gradle icon
- Add Terraform icon

## 1.2.2
- Remove hover cursor in tree view

## 1.2.1
- Fix auto-complete overlay for spell check #242
- Fix selected state in tree view for compact and no icon modes. #283
- Fix wording on setting to disable animations


## 1.2
- Change input color to black
- Compact mode adjustments:
  - Smaller status bar
  - Less space around icons
- Add Twig icon #282
- Add Elm icon #281
- Add sticky project root headers #273
- Change font setting to say "Default Atom Font" instead of "SF UI Text" to make it more clear it is using the default.

## 1.1.2
- Fix Linter rule link badge

## 1.1.1
- Fix selected directory style in compact mode

## 1.1.0
- Adjust compact view
  - Settings vies: remove padding & reduce font size
  - Apply compact view to split panel
  - Tree view "current file" highlight too tall in compact view #265
  - Fix tab close button in compact mode
  - Adjust placeholder height in compact mode
- Add settings
  - Choose system font
  - Disable animations
- Remove sticky project header until bugs can be sorted
- Make tree highlight color more distinct
- Remove button in .btn selector
- TeX icon support improvement

## 1.0.4
- Change header positioning to support top-aligned tool-bar
- Fix autocomplete-plus highlight style

## 1.0.3
- Use css ison for .sss file
- Add .icon-partial mixin for better partial name matching
- Remove border from site root folder

## 1.0.2
- Fix lint label

## 1.0.1
- Fix verion error

## 1.0.0
- UI Overhaul:
  - Larger tabs
  - More space in sidebar
  - File icons now display in fuzzy finder & find & replace
  - Improve system views such as settings & panels
  - New styling for Find & Replace
  - Pin project folder to top
  - Additional theme color options:
    - Blue (Default)
    - Green
    - Orange
    - Pink
    - Purple
    - Steel
    - Yellow
  - Add Roboto font for UI text
  - Custom styling for plugins:
    - Autocomplete Plus
    - Deprecation Cop
    - Linter
    - Pigments
    - Time Cop
- Refactor code base:
  - Add config for user settings:
    - Disable compact mode
    - Enable/Disable Icons
    - Set theme color
    - Enable hiding tabs
    - Enable fully hiding cvs hidden files
  - Add gulp script for building file icons
- Add CONTRIBUTING.md for directions on how to contribute
- Update README
- Update screenshots
- Add file icons:
  - php.inc
  - Swift
  - .gitattributes
  - C
  - C++
  - Rust
  - gulpfile.babel.js
  - Grails
  - PerlScript
  - ECMAScript
  - Scale
  - Java
  - SBT
  - jscs
  - jshint
  - direnv
  - editorconfig
  - LaTeX
  - Ocaml
  - LiveScript
  - Vala
  - HackLang
  - Shell
  - Puppet
  - Haskell
  - Lua
  - Typescript
  - Go
  - C#
  - liquid
  - Haml
  - Media Files (audio, video, image)
  - Font Files

## 0.9.2
- Add cold fusion support
- Add Haml icon

## 0.9.1
- Forgot to update Changelog like a jerk

## 0.9.0
- Allow packages to disable theme icons

## 0.8.1
- Fix tree-view background color
- Add apm installation steps to README
- Fix issues with tab bar

## 0.8.0
- Update settings view
- Limit CPU usage of `<progress>` elements
- Add .yaml as extension for YAML file icon
- Alias .es and .es6 to js

## 0.7.1
- Fix broken icons

## 0.7.0
- Store package style sheets in the styles/ directory instead of stylesheets/ in the color-picker package

## 0.6.3
- Make tab updates backwards compatible

## 0.6.2
- Adjust line number padding
- Fix deprecation errors
- Add icon support for coffee-react files
- Enhance appearance of checkboxes in settings view
- Add checkbox background color & checkbox tick color

## 0.6.1
- Update changelog

## 0.6.0
- Update for new settings view

## 0.5.1
- Fix width on find & replace buttons
- Update screenshot

## 0.5.0
- Add Illustrator source file for icons
- Add additional icon support:
- .ejs (EJS)
- .ico (Favicons)
- .jl (Julia)
- .jsx (React)
- .stache (Stache)
- .ts (Typescript)

## 0.4.0
- Update theme to support the new Shadow DOM implementation.
- Update README.md
- Fix drag file from pane to pane

## 0.3.6
- Update CSS to match only file extensions vs the whole file name
- Add ability to turn off icons

## 0.3.5
- Minor bugfix update

## 0.3.4
- Fix icon for README files
- Update alignment of icons in tabs & sidebar
- Icons added for images
- Fix icon for hidden files

## 0.3.3
- Update background for empty pane (i.e. when nothing is open)

## 0.3.2
- Update panel style to highlight active panel
- Fix new/modified/etc status colors in sidebar
- Add settings icon
- Update styles for ignored files

## 0.3.1
- Add icons to tabs
- Add additional file types
- Fix bug in command pallet introducted with 0.121.0
- Update Screenshots
- A few minor UI tweaks
