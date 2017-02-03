# Seti UI

[![Gitter](https://img.shields.io/gitter/room/jesseweed/seti-ui.svg?style=flat-square)](https://gitter.im/jesseweed/seti-ui) [![apm](https://img.shields.io/apm/dm/seti-ui.svg?style=flat-square)](https://atom.io/themes/seti-ui) [![apm](https://img.shields.io/apm/v/seti-ui.svg?style=flat-square)](https://atom.io/themes/seti-ui) [![apm](https://img.shields.io/apm/l/seti-ui.svg?style=flat-square)](https://atom.io/themes/seti-ui)
[![Gratipay Team](https://img.shields.io/gratipay/team/atom-seti-ui.svg?style=flat-square)](https://gratipay.com/Atom-Seti-UI/)


This is the latest version of the Seti UI theme. It's a dark interface theme crafted especially for [Atom](http://atom.io), with subtle colors that are meant to be easy on the eyes. It includes custom file icons, and new user configurable settings. [Seti Syntax](https://atom.io/themes/seti-syntax) is also available for all your codez.

-----

##### **Please Note:** This is the Seti interface theme for [Atom](http://atom.io) only

This is for the _interface_ of the Atom editor. I also have [Seti Syntax](https://atom.io/themes/seti-syntax) for theming the _code view_ in Atom. In addition, there is a new [Seti theme](https://www.npmjs.com/package/seti-hyper) for [Hyper](https://hyper.is/).

If these are not the droids you're looking for, may I point you in the drection of these great ports:

+ [Emacs](https://github.com/caisah/seti-theme)
+ [iTerm](https://github.com/willmanduffy/seti-iterm)
+ [JetBrains](https://github.com/zchee/Seti_JetBrains)
+ [Sublime Text 3](https://packagecontrol.io/packages/Seti_UI)
+ [Vim](https://github.com/trusktr/seti.vim)

-----

## What's New? 1.0 Update
Seti UI has been updated with a cleaner, more streamlined interface, a slightly tweaked color scheme, additional icons and new user settings, as well as a handful of other small ui improvements and a refactored code base.

![Screenshot](https://github.com/jesseweed/seti-ui/raw/master/screenshot.png)

-----

### More colors
Seti now has 8 theme colors to choose from:
![Screenshot](https://github.com/jesseweed/seti-ui/raw/master/screenshot-colors.png)

-----

### More icons
File icons will now show up in the file search (`cmd+ p`) dialog in addition to the side bar and tabs. This should make for easier grokking when you're searching for a file.

![Screenshot](https://github.com/jesseweed/seti-ui/raw/master/screenshot-search.png)

-----

### Settings
_To get here, Go to "Atom > Preferences" Select "Themes"  and click the settings icon next to "Seti" under UI Theme dropdown_

With 1.0 you can now adjust some of the more commonly requested features directly in Atom's settings view (Settings > Themes > Click the gear icon next to Seti).

+ **File Icons:** Probably the most frequet requests has been a simpler way to disable the file icons for those of you using other file icon packages. Now you can :)
+ **Compact Mode :** Seti 1.0's face-lift brings a cleaner, less cramped interface, which also happens to take up a bit more space. If you prefer the old more compact version, you can revert it here.
+ **Ignored Files:** By default, ignored files are shown as a muted grey. However, if you'd like to hide them altogether you can use this.
+ **Hide Tabs:** Lastly (for now), there have been a few requests to be able to hide tabs altogether. This is of course disabled by default, but if you're the anti-tab type, you can hide them here.

![Screenshot](https://github.com/jesseweed/seti-ui/raw/master/screenshot-settings.png)

Setting are brand new, and still have a few kinks to be worked out. If you run into any problems with them, or would like to request an additional setting, please file an issue!


-----

## Bugs
If you find a bug, please do [add a bug](https://github.com/jesseweed/seti-ui/issues). However, first make sure it is for Seti UI in Atom. I only support the Atom versions, please check the links above to report a bug on another platforms.

##### Seti 1.0 has been optimized to work with Atom 1.6 and above:
###### Including the 1.7 beta
Most if not everything should work on older versions as well, but if you see something that doesn't look quite right, make sure you have the latest version of Atom installed before filling a bug.

-----

## Installation
The easiest way to install Seti is to do as follows:

+ Go to Atom > Settings
+ Click "+ Install"
+ Search for `seti ui` and click `themes` button to search.
+ Browse for `Seti UI` and click `install`

Alternatively you can use the [Atom Package Manager](https://github.com/atom/apm):

```bash
apm install seti-ui
```


-----

## Contributing
Anyone is welcome to contribute to the development of this theme. If can be a lot of work to keep up on, and I'll take help wherever i can get it :)

### 1. Fork
If you're keen to contribute, start by [forking](https://github.com/jesseweed/seti-ui/tree/1.0-beta#fork-destination-box) the repo and cloning it to your computer.

**Note:** To use the development version, you must first uninstall the production version (`apm uninstall seti-ui`), then and run the following commands:

```bash
# To install the local version as an Atom Theme
apm link .

# Open with dev mode:
atom --dev .
```

### 2. Make Some Changes

Once this is complete you will be able to edit seti files directly in Atom and see your changes in real time.

### 3. Create a Pull Request

Once you are satisfied, with your updates, commit your change, push them to your fork and submit a pull request with a description of the changes that you made.

### 4. Unlink

Once you're done working locally and ready to install the production version again, simply run `apm unlink .` from the root of the seti-ui project.


-----

## Adding File Icons
The process of adding file icons is still a bit complex, but it _has_ been greatly simplified in 1.0. It does however require that you have [node](https://nodejs.org/en/) and [gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) installed.

Once you have these, you will need to open a terminal window, navigate to the _seti-ui_ folder and run `npm install` (note you only need to do this once).

Once everything is setup, follow these steps any time you want to add a new icon:

  1. Create an SVG icon with the name of the language, and save it to the `icons` folder _(do not use any spaces or special characters)_

  2. Navigate to the _seti-ui_ folder in your terminal and run `gulp font` (this will add the new svg file to our icon font, update our file as well as the less file with the mixins we'll need to link to the icon later.)

  3. Lastly, open [styles/icons/mapping.less](styles/icons/mapping.less) and create a link for the icon you just added with the `.icon-set` mixin. Assuming you were adding an icon for Sass it might look something like this: ```.icon-set('.scss', 'sass', @pink)```

  The first parameter `'.scss'` is the file extension you want to target, the second parameter `'sass'` is the name of the icon you just created, without the extension (sass.svg), and the last parameter `@pink` indicated what color the icon should be.

  There are currently 9 supported icon colors:
    - @blue
    - @grey
    - @green
    - @orange
    - @pink
    - @purple
    - @red
    - @white
    - @yellow


  While, you _can_ add additional colors to [styles/ui-variables.less](styles/ui-variables.less), but please do not do this unless you find it _absolutely_ necessary. If you do add another color, please make sure that matches the general feel of the other colors. If you add something really bright or really pale, your pull request will likely be declined.

  You will need to do this once for every extension, you want to target. For example, if you want to target both **.sass** and **.scss** extensions, you would add the following:

```
.icon-set('.sass', 'sass', @pink);
.icon-set('.scss', 'sass', @pink);
```

-----

## Current Icons
![Screenshot](https://github.com/jesseweed/seti-ui/raw/master/screenshot-icons.png)

-----

## Custom App Icons
If you'd like a new app icon to match the look & feel of Seti, feel free to use one of these:

[ ![Screenshot](https://github.com/jesseweed/seti-syntax/raw/master/_icons/circular/circular-128x128.png) ](https://github.com/jesseweed/seti-syntax/tree/master/_icons/circular)
[ ![Screenshot](https://github.com/jesseweed/seti-syntax/raw/master/_icons/rounded/rounded-128x128.png) ](https://github.com/jesseweed/seti-syntax/tree/master/_icons/rounded/)
[ ![Screenshot](https://github.com/jesseweed/seti-syntax/raw/master/_icons/squared/squared-128x128.png) ](https://github.com/jesseweed/seti-syntax/tree/master/_icons/squared/)
