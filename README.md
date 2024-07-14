A library who provide tool to play with colors.

### how to use it

`npm install pigmentum`

`import { hexToRGB } from 'pigmentum';`

### Available functions


| **name**     | **parameters**                       | **return value** | **description**                                                                                                    |
|--------------|--------------------------------------|------------------|--------------------------------------------------------------------------------------------------------------------|
| hexToRGB     | hexColor: string                     | number[]         | Take a 3 or 6 digit hex code and translate it into an array of number [R, G, B]                                    |
| rgbToHex     | rgbColor: number[]                   | string           | Take an array of number with value [R, G, B] and translate it into a 6 digit hex code.                             |
| buildPalette | colorsArray: string[], steps: number | string[]         | Take an array of 3 or 6 digit hex code, and a number of step between each colorArray element and return a gradiant |