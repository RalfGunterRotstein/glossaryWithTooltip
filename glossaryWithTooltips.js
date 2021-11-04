/**
 * Adds tooltips for keywords and inserts a glossary if there is a place for it.
 * 
 * Another script is needed to deal with the "clickable" class.
 * 
 * @author Ralf Gunter Rotstein <ralf.rotstein@gmail.com>
 * @copyright Copyright (c) 2021, Ralf Gunter Rotstein
 * @license https://www.gnu.org/licenses/gpl-3.0.html GNU General Public License
 * 
 * @category glossaryWithTooltips
 * @package glossaryWithTooltips
 * @version 1.0.0
 */

/**
 * Dictionary with definitions for keywords.
 * @type {string[]} "key" => "value"
 */
const glossary = {
    "brillig": "Four o’clock in the afternoon (the time when you begin broiling things for dinner).",
    "slithy": "Lithe and slimy.",
    "tove": "Something like badgers, something like lizards and something like corkscrews.",
    "gyre": "To go round and round like a gyroscope.",
    "gimble": "To make holes like a gimlet.",
    "wabe": "The grass-plot round a sun-dial.",
    "mimsy": "Flimsy and miserable.",
    "borogove": "A thin shabby-looking bird with its feathers sticking out all round (something like a live mop).",
    "mome": "Short for “from home” (I think).",
    "rath": "A sort of green pig.",
    
    "craft": "Skill used in deceiving others.",
    "ambition": "A great desire of unnecessary things.",
    "spite": "A desire to hurt, annoy, or offend someone.",
    "quench": "Achieving what one wants.",
};



$(document).ready(
    /**
     * Deals with existing keywords and insert glossary if the page has a place for it.
     * @returns {void}
     */
    function() {
        insertDefinitionsIntoKeywords();
        insertGlossary();
    }
);



/**
 * Gives each span[data-keyword] a definition that appears when the mouse is over them.
 * @returns {void}
 */
function insertDefinitionsIntoKeywords() {
    $("span[data-keyword]").each((index, span) => {
        const $span = $(span);

        const keyword = $span.data("keyword");
        const definitionText = glossary[keyword];

        if (definitionText) {
            // Shows the user the word is a keyword.
            $span.addClass("keyword");

            // Adds the possibility of clicking the word.
            $span.addClass("clickable");

            // Inserts the definition's HTML into the keywords's SPAN.
            $span.append(definitionHtml(definitionText));

            // Sets definition's position when it appears.
            $span.mouseover(function() { positionDefinitionHtml($span); });
        }
    });
}

/**
 * If there is a #glossary-wrapper, inserts a dictionary with all keyword into it.
 * @returns {void}
 */
function insertGlossary() {
    const $glossaryWrapper = $("#glossary-wrapper");
    
    // Checks if there is a wrapper (it means there should be a list).
    if ($glossaryWrapper) {
        // Creates a list.
        const $definitionList = $("<dl></dl>");
        $definitionList.attr("id", "glossary__list");

        // Gets glossary in alphabetical order.
        const alphabeticGlossary = alphabeticallyOrderedObjectKeys(glossary);

        // Adds all glossary items into the list.
        alphabeticGlossary.forEach(key => {
            const $listItem = glossaryListItemHtml(key);
            $definitionList.append($listItem);
        });

        // Inserts the list into its wrapper.
        $glossaryWrapper.append($definitionList);
    }
}



/**
 * Div to be inserted into each span[data-keyword].
 * @returns {HTMLElement}
 */
function definitionHtml(definitionText) {
    const $div = $("<div></div>");
    $div.addClass("keyword__definition");
    $div.text(definitionText);
    return $div;
}

/**
 * Avoids horizontal overflow.
 * @param {HTMLElement} $keywordSpan A span containing a keyword.
 * @returns {void}
 */
function positionDefinitionHtml($keywordSpan) {
    // Gets the definition inside the keyword's SPAN.
    $definition = $keywordSpan.find(".keyword__definition");

    // If the parent is before half screen, limits left, extending definition to the right.
    if ($keywordSpan.offset().left < $(window).width()/2) {
        $definition.first().css("left", "0px");
        $definition.first().css("right", "auto");
    }
    // If it's after half screen, limits right, extending definition to the left.
    else {
        $definition.first().css("left", "auto");
        $definition.first().css("right", "0px");
    }
}

/**
 * Array with all keys of the dictionary in alphabetical order.
 * @param {HTMLElement} glossary A dictionary with all keywords and definitions.
 * @returns {string[]}
 */
function alphabeticallyOrderedObjectKeys(glossary) {
    var keys = [];

    // Turn glossary keys into the values of a new array.
    for (key in glossary)
        keys.push(key);

    // Puts new array's values in alphabetical order.
    keys.sort((a, b) => {return normalizedString(a) > normalizedString(b) ? 1 : -1;});

    return keys;
}

/**
 * Equalizes chars that should be ordered as if they were the same. (Ã -> a)
 * @param {HTMLElement} str A string with special characters.
 * @returns {string}
 */
function normalizedString(str) {
    str = str.toLowerCase();

    str = str.replace("á", "a");
    str = str.replace("â", "a");
    str = str.replace("ã", "a");
    str = str.replace("é", "e");
    str = str.replace("ê", "e");
    str = str.replace("í", "i");
    str = str.replace("ó", "o");
    str = str.replace("ô", "o");
    str = str.replace("õ", "o");
    str = str.replace("ú", "u");
    str = str.replace("ç", "c");

    return str;
}

/**
 * An item for a DL, with a keyword as DT and its definition as DD.
 * @param {HTMLElement} key A keyword existent in the glossary.
 * @returns {HTMLElement} A DIV containing a DT and a DD.
 */
function glossaryListItemHtml(key) {
    if (!glossary[key])
        return null;
        
    const $item = $("<div></div>");
    $item.addClass("definition-list__item");
    
    const $definitionTitle = $("<dt></dt>");
    $definitionTitle.text(key);
    $item.append($definitionTitle);
    
    const $definitionData = $("<dd></dd>");
    $definitionData.text(glossary[key]);
    $item.append($definitionData);

    return $item;
}