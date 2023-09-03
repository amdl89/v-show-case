const NONE_MARKER = '0';
const SHOW_WHEN_MARKER = '1';
const SHOW_ELSE_MARKER = '2';
const SEPARATOR_MARKER = '3';

const VALIDATION_REGEX_STRING = `^(${SHOW_WHEN_MARKER}${SEPARATOR_MARKER})+(${SHOW_ELSE_MARKER}${SEPARATOR_MARKER})?$`;

function validateShowCase(nodes) {
    const validationRegex = new RegExp(VALIDATION_REGEX_STRING);
    return validationRegex.test(
        createRegexString(nodes)
    );
}

function createRegexString(nodes) {
    let marker = [];
    if (Array.isArray(nodes)) {
        nodes.filter(node => node.type !== 3)
            .forEach((node) => {
                if(node.type !== 1) {
                    throwError('v-show-case children must be an element or component', node.loc)
                }

                let childMarker = '';

                const forOrIfProp = node.props.find(p => {
                    return p.name === 'for' || p.name === 'if';
                });

                if(forOrIfProp) {
                    throwError('v-show-case children cannot contain v-if or v-for directives', node.loc);
                }

                const showWhenProp = node.props.find(p => {
                    return p.name === 'show-when';
                });

                if (showWhenProp) {
                    if (!showWhenProp.exp) {
                        throwError('v-show-when directive requires an argument', node.loc);
                    }

                    childMarker += SHOW_WHEN_MARKER;
                }

                const showElseProp = node.props.find(p => {
                    return p.name === 'show-else';
                });

                if (showElseProp) {
                    if (showElseProp.exp) {
                        throwError('v-show-else directive does not take any arguments', node.loc);
                    }

                    childMarker += SHOW_ELSE_MARKER;
                }

                if (childMarker === '') {
                    childMarker += NONE_MARKER;
                }

                childMarker += SEPARATOR_MARKER;

                marker.push(childMarker);
            });

        if (!marker.length) {
            marker.push(NONE_MARKER);
        }
    } else {
        marker.push(NONE_MARKER);
    }

    return marker.join('');
}

function throwError(message, loc) {
    throw new Error(`${message} (Line: ${loc.start.line})\n${" ".repeat(loc.start.column)}${loc.source}`);
}

export function validateVShowCase(node) {
    if (node.tag === 'v-show-case') {
        if (!validateShowCase(node.children)) {
            throwError("Invalid syntax for v-show-case", node.loc);
        }
    }
}