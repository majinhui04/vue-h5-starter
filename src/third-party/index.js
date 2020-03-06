const modules = {};
const requireContext = require.context('./modules', true, /\index.js/);
const requireAll = context => {
    context.keys().forEach(key => {
        const name = key.replace('./', '').replace('/index.js', '');
        modules[name] = requireContext(key).default || requireContext(key);
    });
};

requireAll(requireContext);

export default modules;
