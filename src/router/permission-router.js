const modules = {};
const routes = [];
const requireContext = require.context('@/views', true, /router\.js/);
const requireAll = context => {
    context.keys().forEach(key => {
        modules[key] = requireContext(key).default || requireContext(key);
    });
};

requireAll(requireContext);
Object.values(modules).forEach(item => {
    routes.push(item);
});

function buildTree(list) {
    const map = {};
    list.sort((a, b) => {
        return a.meta.rank - b.meta.rank;
    });
    list.forEach(item => {
        if (!map[item.name]) {
            map[item.name] = item;
        }
    });
    const result = [];
    list.forEach((item, index) => {
        const { meta } = item;
        item.meta = item.meta || {};
        const parentName = meta.parent || '';
        if (parentName) {
            if (map[parentName]) {
                map[parentName].children
                    ? map[parentName].children.push(item)
                    : (map[parentName].children = [item]);
            }
        }
    });
    Object.keys(map).forEach(name => {
        if (!map[name]['meta']['parent']) {
            result.push(map[name]);
        }
    });
    result.forEach(item => {
        if (item.children && item.children.length) {
            // item.children = item.children.sort((a, b) => {
            //     return a.meta.rank - b.meta.rank
            // })
            item.redirect = item.children[0]['path'];
        }
    });
    return result;
}
const tree = buildTree([...routes]);

export default tree;
