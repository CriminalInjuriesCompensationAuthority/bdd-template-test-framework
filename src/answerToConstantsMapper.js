'use strict';

// const runBrowserTests = process.env.run_ui_tests === 'true';

async function mapAnswersToLookupConstants(answer) {
    const answerArray = [];
    let selectableElement = '';
    Array.from(answer).forEach(char => {
        if (char === ',' && selectableElement === '') {
            return;
        }
        if (char !== '{') {
            if (char === '}') {
                answerArray.push(selectableElement.trim());
                selectableElement = '';
            } else {
                selectableElement = selectableElement.concat(char);
            }
        }
    });
    return answerArray;
}
exports.mapAnswersToLookupConstants = mapAnswersToLookupConstants;
