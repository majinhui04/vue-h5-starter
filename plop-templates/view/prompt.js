const {
    notEmpty
} = require('../utils.js');

module.exports = {
    description: 'generate a view',
    prompts: [{
            type: 'input',
            name: 'name',
            message: '请输入组件name',
            validate: notEmpty('name')
        },
        {
            type: 'input',
            name: 'title',
            message: '请输入路由title'
        },
        // {
        //     type: 'input',
        //     name: 'rank',
        //     message: '请输入排序(1,2,3依次排序，默认按组件名字排序)'
        // },
        {
            type: 'input',
            name: 'parent',
            message: '请输入父级路由name（填写则自动转成多级路由）'
        },
        {
            type: 'checkbox',
            name: 'blocks',
            message: 'Blocks:',
            choices: [{
                    name: 'auth',
                    value: 'auth',
                    checked: false
                },
                {
                    name: 'keepAlive',
                    value: 'keepAlive',
                    checked: false
                }
            ],
            validate(value) {
                // if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
                //     return 'View require at least a <script> or <template> tag.';
                // }
                return true;
            }
        }
    ],
    actions: data => {
        const name = '{{name}}';
        const title = '{{title}}';
        // const rank = '{{rank}}';
        const parent = '{{parent}}'
        const actions = [{
                force: true,
                type: 'add',
                path: `src/views/${name}/index.vue`,
                templateFile: 'plop-templates/view/index.hbs',
                data: {
                    name: name
                }
            },
            {
                force: true,
                type: 'add',
                path: `src/views/${name}/router.js`,
                templateFile: 'plop-templates/route/index.hbs',
                data: {
                    parent,
                    name: name,
                    title: title,
                    // rank: rank,
                    auth: data.blocks.includes('auth'),
                    keepAlive: data.blocks.includes('keepAlive')
                }
            }
        ];

        return actions;
    }
};
