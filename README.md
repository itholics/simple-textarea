# Simple Textarea

## Features
- Line numbers
- Dynamic tab with spaces.
- Inserts editor at position or replaces textarea with its attributes.

## Dependencies
- [common-tags](https://github.com/zspecza/common-tags) loaded if not present.
- [jQuery](https://jquery.com/) is extended with function `ithEditor` if jQuery is present.
- Styling is appended to the head element.

## Usage
### Native

```html
<div class="target"></div>
<textarea class="target2"></textarea>
<script src="#link-to-script"></script>
```
```javascript
    ITHEditor('.target') // only first match is used currently
    ITHEditor(document.querySelector('.target')) // elements are also supported
    ITHEditor('.target2')
    // for all matches
    document.querySelectorAll('.target').forEach(function(target){
        ITHEditor(target)
    })
```

### jQuery

```html
<div class="target"></div>
<textarea class="target"></textarea>
<script src="#link-to-jquery"></script>
<script src="#link-to-script"></script>
```
```javascript
   $('.target').ithEditor() // all matches are transformed
```

## Options

| option            | description                                             |
|-------------------|---------------------------------------------------------|
| numberLength      | Number count for line number section (width, default=4) |
| rows              | Min height by rows (default=10)                         |
| paddingVertical   | Vertical padding (css ready, default=0.5em)             |
| paddingHorizontal | Horizontal padding (css ready, default=8px)             |
| fontSize          | Font size (css ready, defualt=16px)                     |
| lineHeight        | Line height (css ready, default=1.3em)                  |
| background        | Background (css ready, default=#333)                    |
| color             | Font color (css ready, default=#fff)                    |
| numberOpacity     | Opacity for numbers (css ready, default=50%)            |

