const viewGenerator = require('./plop-templates/view/prompt');
const componentGenerator = require('./plop-templates/component/prompt');

module.exports = function(plop) {
    plop.setHelper('formatPath', function(name) {
        if (name === 'index') {
            return '';
        } else {
            return name;
        }
    });
    plop.setGenerator('view', viewGenerator);
    plop.setGenerator('component', componentGenerator);
};
