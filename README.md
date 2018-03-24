# summernote-image-attributes

This version of summernote-image-attributes is a fork of the original project by [DiemenDesign](https://github.com/DiemenDesign/summernote-image-attributes)

A plugin for the [Summernote](https://github.com/summernote/summernote/) WYSIWYG editor.

Adds a button to the image popover to edit title, alt, class and style attributes, and Links with relevant Attributes.

### Installation

#### 1. Include JS

Include the following code after including Summernote, to change the language from the default (en-US) you must add the lang file after the plugin.

````html
<script src="summernote-image-attributes.js"></script>
<script src="lang/[language-COUNTRY].js"></script>
````

#### 2. Supported languages
Currently available in US English (Default), Spanish, French, Chinese (Traditional), Italian, German and Turkish!

#### 3. Summernote options
Finally, customize the Summernote image popover.

````javascript
$(document).ready(function() {
    $('#summernote').summernote({
        popover: {
            image: [
                ['custom', ['imageAttributes']],
                ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
                ['float', ['floatLeft', 'floatRight', 'floatNone']],
                ['remove', ['removeMedia']]
            ],
        },
        lang: 'en-US', // Change to your chosen language
        // imageAttribute configurations to enable/disable image popover tabs/fields
        imageAttributesIcon: '<i class="note-icon-pencil"/>',
        imageAttributesRemoveEmpty: true,
        imageAttributesDisableImage: false,
        imageAttributesDisableImageSource: true,
        imageAttributesDisableImageTitle: false,
        imageAttributesDisableImageAltText: false,
        imageAttributesDisableImageDimensions: true,
        imageAttributesDisableAttributes: true,
        imageAttributesDisableAttributesClass: false,
        imageAttributesDisableAttributesStyle: false,
        imageAttributesDisableAttributesRole: false,
        imageAttributesDisableLink: false,
        imageAttributesDisableLinkUrl: false,
        imageAttributesDisableLinkTarget: false,
        imageAttributesDisableLinkClass: true,
        imageAttributesDisableLinkStyle: true,
        imageAttributesDisableLinkRel: true,
        imageAttributesDisableLinkRole: true,
        imageAttributesDisableUpload: true,
        imageAttributesImageFolder: ''
    });
});
````
