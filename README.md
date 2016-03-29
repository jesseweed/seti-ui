# Seti UI

[![Join the chat at https://gitter.im/jesseweed/seti-ui](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/jesseweed/seti-ui?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


This is the latest version of Seti UI theme. It's a dark interface theme be especially for [Atom](http://atom.io), with subtle colors that are meant to be easy on the eyes. It includes custom file icons, and new user configurable settings. [Seti Syntax](https://atom.io/themes/seti-syntax) also available.

-----

##### **Please Note:** This is the original Seti interface theme for [Atom](http://atom.io) only

This is for the _interface_ of the Atom editor. I also have [Seti Syntax](https://atom.io/themes/seti-syntax) for theming the _code view_ in Atom.

If these are not the droids you're looking for, may I point you in the drection of these great ports:

+ [Sublime Text 3](https://packagecontrol.io/packages/Seti_UI)
+ [Webstorm](https://github.com/zchee/Seti_JetBrains)
+ [iTerm](https://github.com/willmanduffy/seti-iterm)
+ [Vim](https://github.com/trusktr/seti.vim)
+ [Emacs](https://github.com/caisah/seti-theme)

-----

## What's New? 1.0 Update
Seti UI has been updated with a cleaner, more streamlined interface, a slightly tweaked color scheme, additional icons, new user settings, and a handful of other small improvements.

![Screenshot](https://github.com/jesseweed/seti-ui/raw/1.0-beta/screenshot-01.png)

-----

### More icons
File icons will now show up in the file search (`cmd+ p`) dialog in addition to the side bar and tabs. This should make for easier grokking when you're searching for a file.

![Screenshot](https://github.com/jesseweed/seti-ui/raw/1.0-beta/screenshot-02.png)

-----

### Settings
With 1.0 you can adjust some of the most commonly requested settings.

+ **File Icons:** One of the most common requests has been a simpler way to disable the file icons for those of you using other file icon packages. Now you can :)
+ **Compact Mode :** Seti has been updated with a cleaner, less cramped interface. However, if you prefer the old more compact version, you can recert it here.
+ **Ignored Files:** By default, ignored files are shown as a muted grey. However, if you'd like to hide them altogether you can use this.
+ **Hide Tabs:** Lastly (for now), there have been a few requests to be able to hide tabs altogether. This is of course disabled by default, but if you're the anti-tab type, you can hide them here.

![Screenshot](https://github.com/jesseweed/seti-ui/raw/1.0-beta/screenshot-03.png)


-----

## Bugs
If you find a bug, please do [create an issue](). However, first make sure it is for Seti UI in Atom. I only support the Atom versions, please check the links above to report a bug on another platform.

**Seti 1.0 has been optimized to work with Atom 1.6 and above:** (including the 1.7 beta). Most if not everything should work on older versions as well, but if you see something that doen't look quite right, make sure you have the latest version of Atom installed before filling a bug.

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
Anyone is welcome to contribute to the development of this theme.

### 1. Fork
If you would like to contribute, start by clicking the `Fork` button above. Then clone to your computer.

To use the development version, you must first install the production version, then and run the following commands:

```bash
# To install the local version as an Atom Theme
apm link .

# Open with dev mode:
atom --dev .
```

### 2. Make Some Changes

Once this is complete you will be able to edit in Atom and see your changes in real time.

### 3. Create a Pull Request

Once you are satisfied, with your updates, commit your change, push them to your fork and submit a pull request outlining the changes that you have made.

-----

## Adding File Icons
The process of adding file icons is still a little complex, but has been greatly simplified in 1.0. It does howevere require that you have [node](https://nodejs.org/en/) and [gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) installed.

Once you have these, you will need to open a terminal window, navigate to the _seti-ui_ folder and run `npm install` (note you only need to do this once).

Once everything is setup, follow these steps any time you want to add a new icon:

  1. Create an SVG icon with the name of the language, and save it to the `icons` folder _(do not use any spaces special characters)_

  2. Navigate to the _seti-ui_ folder in you terminal and run `gulp fonts` (this will add the svg file to our icon font, and update the needed less file.)

  3. Last, open [styles/icons.less](styles/icons.less) and create a link for the icon you just added. Something like `.icon-tab('.sass', 'sass', @pink)`. Here, the first parameter ('.sass') is the extension you want to target, the second parameter ('sass') is the name of the icon you just created (sass.svg), and the third parameter (@pink) is the color you want to the icon to be.

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


  While, you _can_ add additional colors to [styles/ui-variable.less](styles/ui-variable.less), but please do not do this unless you find it _absolutely_ necessary. If you do add another color, please make sure that matches the general feel of the other colors. If you add something really bright or really pale, your pull request will likely be declined.

-----

## Custom App Icons
If you'd like a new app icon to match the look & feel of Seti, feel free to use one of these:

[ ![Screenshot](https://github.com/jesseweed/seti-syntax/raw/master/_icons/circular/circular-128x128.png) ](https://github.com/jesseweed/seti-syntax/tree/master/_icons/circular)
[ ![Screenshot](https://github.com/jesseweed/seti-syntax/raw/master/_icons/rounded/rounded-128x128.png) ](https://github.com/jesseweed/seti-syntax/tree/master/_icons/rounded/)
[ ![Screenshot](https://github.com/jesseweed/seti-syntax/raw/master/_icons/squared/squared-128x128.png) ](https://github.com/jesseweed/seti-syntax/tree/master/_icons/squared/)
