'use strict';
const path = require('path');
// TODO fix this.... and add README.md instructions
const applicationTemplate = require('../../../dist/template.json');

const applicationTemplateAsJson = JSON.stringify(applicationTemplate);

function getApplicationTemplateCopy() {
    return JSON.parse(applicationTemplateAsJson);
}

// Line 14/16: Unexpected token ...
// Need to fix this ??......
module.exports = {
    'sexual-assault': (id) => ({
        id,
        ...getApplicationTemplateCopy()
    })
};
