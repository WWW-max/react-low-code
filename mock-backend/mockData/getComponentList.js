
function getComponentList() {
    return [
        // Title
        {
            fe_id: 'c2',
            type: 'questionTitle',  // 组件类型不能重复，前后端统一好
            title: '标题',

        },
        // Input
        {
            fe_id: 'c3',
            type: 'questionInput',
            title: '输入框1'
        }

    ]
}

module.exports = getComponentList;