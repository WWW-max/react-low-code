function getComponentList() {
  return [
    // Title
    {
      fe_id: 'c2',
      type: 'questionTitle', // 组件类型不能重复，前后端统一好
      title: '标题',
      isHidden: false,
      isLocked: false,
    },
    // Input
    {
      fe_id: 'c3',
      type: 'questionParagraph',
      title: '段落',
      isHidden: false,
      isLocked: false,
    },
    {
      fe_id: 'c4',
      type: 'questionTextarea',
      title: '多行输入',
      isHidden: false,
      isLocked: false,
    },
    {
      fe_id: 'c5',
      type: 'questionInfo',
      title: '问卷信息',
      isHidden: false,
      isLocked: false,
    },
    {
      fe_id: 'c6',
      type: 'questionInput',
      title: '输入框',
      isHidden: false,
      isLocked: false,
    },
    {
      fe_id: 'c7',
      type: 'questionRadio',
      title: '单选框',
      isHidden: false,
      isLocked: false,
      props: {
        title: '单选标题',
        isVertical: false,
        options: [
          { value: 'item1', text: '选项1' },
          { value: 'item2', text: '选项2' },
          { value: 'item3', text: '选项3' },
        ],
        value: '',
      },
    },
    {
      fe_id: 'c8',
      type: 'questionCheckbox',
      title: '多选框',
      isHidden: false,
      isLocked: false,
      props: {
        title: '多选框',
        isVertical: false,
        list: [
          { value: 'item1', text: '选项1', checked: true },
          { value: 'item2', text: '选项2', checked: false },
          { value: 'item3', text: '选项3', checked: false },
        ],
      },
    },
  ];
}

module.exports = getComponentList;
