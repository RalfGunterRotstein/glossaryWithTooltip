/**
 * Adds and removes the class "clicked" to elements with the class "clickable".
 * @author Ralf Gunter Rotstein <ralf.rotstein@gmail.com>
 * @copyright Copyright (c) 2021, Ralf Gunter Rotstein
 * @license https://www.gnu.org/licenses/gpl-3.0.html GNU General Public License
 * 
 * @category ClickHandler
 * @package ClickHandler
 * @version 1.0.0
 */
class ClickHandler {
    /**
     * Sets instance ready to use.
	 * @constructor
     */
    constructor() {
        /**
         * @property {boolean} allowTouch True will consider touch and ignore click.
         */
        this.allowTouch = false;

        jQuery(window).on("click", event => this.click($(event.target)));

        jQuery(window).on("touchstart", () => this.touchstart());
        jQuery(window).on("touchmove", () => this.touchmove());
        jQuery(window).on("touchend", event => this.touchend($(event.target)));
    }





    /**
     * Considers click, ignoring touch.
     * @param {jQuery} $target Clicked element's object.
     * @returns {void}
     */
    click($target) {
        if (!this.allowTouch)
            this.causeEffect($target);
    }

    /**
     * Considers touch, ignoring click.
     * @returns {void}
     */
    touchstart() { this.allowTouch = true; }

    /**
     * Cancels touch.
     * @returns {void}
     */
    touchmove() { this.allowTouch = false; }
    
    /**
     * Acts as if a click has ocurred.
     * @param {jQuery} $target Clicked element's object.
     * @returns {void}
     */
    touchend($target) {
        if (this.allowTouch)
            this.waitForClickDefaultEvent($target).then(
                $target => this.causeEffect($target)
            );
    }


    
    /**
     * Adds a class to indicate the element was clicked, while removing it from others.
     * @param {jQuery} $target Clicked element's object.
     * @returns {void}
     */
    causeEffect($target) {
        $(".clicked").each((index, object) => {
            if (object != $target[0])
                $(object).removeClass("clicked");
        });

        if ($target.hasClass("clickable"))
            $target.toggleClass("clicked");
    }
    
    /**
     * Avoids bugs for the touch event being faster than the click event.
     * @param {jQuery} $target Clicked element's object.
     * @returns {jQuery} The parameter ($target).
     */
    waitForClickDefaultEvent($target) {
        return new Promise(resolve => setTimeout(
            () => resolve($target), 50)
        );
    }
}

$(document).ready(function() {
    const clickHandler = new ClickHandler();
});