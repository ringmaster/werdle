function focusNextElement () {
    //add all elements we want to include in our selection
    var focussableElements = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
    var focussable = Array.prototype.filter.call(document.querySelectorAll(focussableElements),
    function (element) {
        //check for visibility while always include the current activeElement 
        return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
    });
    var index = focussable.indexOf(document.activeElement);
    if(index > -1) {
        var nextElement = focussable[index + 1] || focussable[0];
        nextElement.focus();
    }                    
}

export {focusNextElement}