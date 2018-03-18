const CRLF = "\r\n";
const selector = require('cheerio');

module.exports = {
    selector,
    outputFormatter: false,
    debugMode: false,
    format: function (color, message) {

        if (!this.outputFormatter) return message;

        return this.outputFormatter[color](message);

    },
    loadSelector: function (html) {

        return this.selector.load(html);

    },
    _valid: function (rule, html) {

        var $$ = this.loadSelector(html);

        var needDebug = this.debugMode || rule.debug;

        var selectorResult = $$(rule.selector);

        if (needDebug) {
            console.log("selector: " + rule.selector + CRLF + "results:" + CRLF);
            console.log(selectorResult);
        }

        var value = rule.callback ? rule.callback(selectorResult) : selectorResult.length;

        if (needDebug) {
            console.log("Return value:" + CRLF);
            console.log(value);
        }

        var condition = rule.condition === undefined ? { greater: 0 } : rule.condition;

        if (needDebug) {
            console.log("condition:" + CRLF);
            console.log(condition);
        }

        var result = true &&
            ((condition.greater !== undefined && value > condition.greater)
                || (condition.lower !== undefined && value < condition.lower)
                || (condition.equal !== undefined && value === condition.equal));

        if (needDebug) {
            console.log("Result: " + CRLF);
            console.log(result);
        }

        return {value, result, selectorResult};
    },
    valid: function (rule, html) {

        if (!rule.selector) return "selector is required for a rule" + CRLF;
        if (!rule.description) return "description is required for the rule" + CRLF;
        if (!rule.false && !rule.true) return "a boolean trigger is required for the rule" + CRLF;

        var output = '';

        output += this.format('yellow', "Testing Rule: ") + rule.description + CRLF;

        var {value, result, selectorResult} = this._valid(rule, html);

        if (rule[result]) {
            output += this.format("red", "FAILED: ") + rule[result].replace('{value}', value) + '.' + CRLF;
        } else {
            output += this.format("green", "PASSED.") + CRLF;
        }

        return {output, result, selectorResult};
    }
};
