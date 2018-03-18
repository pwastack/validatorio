# Validatorio

Fast, flexible & lean implementation html validator/extractor best fit for frontend developer,frontend tester, crawler, SEO optimize. 

## Installation

- If you don't need to run the validatorio as a command line tools, and use as a library for your nodejs application:
```
npm install validatorio
```

- If you need to run the validatorio as a command line tool, you need install it's as global:
`npm install validatorio -g`

- Check if validatorio commandline is installed global:
`validatorio`

- Or installed as local package:
 `node ./node_modules/validatorio/bin/cli.js`


## How to use:

### For developer

```
import validatorio from 'validatorio';
import rules from '/path/to/rules'

var result = validatorio.valid(rules,html_need_totest);
```

### Use linux pipe style 

- Full support most common request library on linux/macos: wget, curl:
`curl https://www.shopback.sg -s -H 'Cache-Control: no-cache' | validatorio`

- Full support most common linux commands:
`cat /path/to/input.html | validatorio > /path/to/output.txt`

- Flexible output: to console, to a file:
`cat /path/to/input.html | validatorio`

#### With command line arguement
 
- Specicic where to load rules, input html need to valid and where to export the result:
`validatorio -i /path/to/input.html -o /path/to/output.txt -r /path/to/rules.js`

- Display full arguments list with help:
`validatorio -h`

#### Mixin style
 - Free to mixin pipe linux and arguement style
 ``` 
  cat /path/to/input.html | validatorio -o /path/to/output.txt;
  validatorio -i /path/to/input.html > /path/to/output.txt;

 ```

## Customize: 

### Add A custom rule:
 - Check config/rules.js for predefined valid rules.
 - A valid rule is defined by an object with following property:
 ```
 	{
 		description: "Testing rule description is *required*",
 		selector: "a css3 selector is *required*",

 		# A condition is *option*. Default value: { greater: 0 }
 		condition: 
 		{
 			greater: 0,
 			# You can add many combined condition in OR expreesion
 			# lower: 100, 
 			# equal: 200,
 		},
 		
 		# a callback function can customize if you want more customize the result, 
 		# if not provided the default value is result.length
 		callback: function(result){
 			return result.text().length
 		},

 		# a debug flag is a optionto show rule debug with css selector result. 
 		# Default value: false
 		debug: true,

 		# a boolean trigger is *required*, boolean trigger can be true or false
 		# provided boolean trigger will be fire after the condition expression apply to return result:
 		false: "Message you want to display if result is false, you can pass {value} to show the css selector result you expect"
 		//true: "Message you want to display if result true."
 	}	
 ```

 - A rule can be defined by a json file, check config/rule.json for example. json rule can't use with use with callback customize


### Customize css selector engine:

- Use jquery selector instead of cheerio on browser enviroment:
```
validatorio.loadSelector = (html) => {
	return jQuery;
}
```

## Features

- Free to customize the css selector engine.
- Wide enviromnet support, work good on both browser enviroment and server side
- A ultimate command line buildin.
- Full Customable condition rules and parser.
- CSS3 selector, jquery friendly syntax.

## Todo Lists

- A simple test integrate with https://cypress.io a modern frontend testing tool.
- Add more testing rules preset.
- A html reporter to easy to publish the testing result to browser.

## Built With

* [cheerio](https://github.com/cheeriojs/cheerio) - A jquery like library for server side.
* [commander](https://github.com/tj/commander.js) - A library for nodejs command line interface, make geek more geek.
* [color](https://github.com/Qix-/color) - Make black/white into colors.

## Acknowledgments

* css3 selector. very few frontend development with javascript if you want detail customize

## Authors

* **Le Tuan** - *Initial work* - [Mage2Guru](https://github.com/Mage2Guru)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


