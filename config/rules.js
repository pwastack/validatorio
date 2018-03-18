module.exports = [
    {
        description: 'Check <img> tag without alt attribute',
        selector: 'img:not([alt])',
        true: 'There are {value} <img> tags without alt attribute',
    },
    {
        description: 'Check <a> tag without rel attribute',
        selector: 'a:not([rel])',
        true: 'There are {value} <a> tags without rel attribute'
    },
    {
        description: 'HTML with title',
        selector: 'head title',
        false: "This html don't have <title> tag"
    },
    {
        description: 'HTML with title not too long',
        selector: 'head title',
        callback: function (result) { return result.length == 1 ? result.text().length : 0; },
        condition: {
            greater: 100,
            equal: 0
        },
        true: "This html title is too long. {value} characters",
    },
    {
        description: 'check HTML with meta description ',
        selector: 'head meta[name=description]',
        false: "Meta doesn't containt a description"
    },
    {
        description: 'No more than 15 strong elements',
        selector: 'strong',
        condition: {
            greater: 15
        },
        true: "total {value} strong elements"
    },
    {
        description: 'Should have only 1 h1 tag',
        selector: 'h1',
        condition: {
            greater: 1,
            equal: 0
        },
        true: "Have {value} h1 tags"
    },
];
