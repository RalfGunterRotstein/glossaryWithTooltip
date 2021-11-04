# glossaryWithTooltip
A **jQuery** script and some **CSS** styles that highlight keywords, show their definition on hover or click and insert in the page a dictionary with all of them.

How to use it:
1. Wrap the words you want to give a definition to in a **SPAN** with the attribute **"data-keyword='definition-of-the-word'"**.
2. Put your keywords and definitions in the **constant array "glossary"**, in the file **glossaryWithTooltip.js**.
3. If your language uses **special characters**, set their alphabetical order in the function **"normalizedString"**, by equalizing them to their regular version (e.g. ã -> a).
4. Insert an empty **DIV** with the ID **"glossary-wrapper"** where you want the dictionary to appear.
5. Change the file **style.css** according to your design.

You can see it working at [Glossary With Tooltip – Ralf’s Portfolio](http://ralf.infinityfreeapp.com/glossary-with-tooltip/).

Requires a script that adds the class "clicked" to elements with the class "clickable" when clicked. I’ve used [my own](https://github.com/RalfGunterRotstein/ClickHandler).