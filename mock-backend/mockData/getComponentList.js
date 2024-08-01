function getComponentList() {
  return [
    // Title
    {
      fe_id: 'c2',
      type: 'questionTitle', // 组件类型不能重复，前后端统一好
      title: '标题b',
    },
    // Input
    {
      fe_id: 'c3',
      type: 'questionParagraph',
      title: '段落b',
    },
    {
      fe_id: 'c4',
      type: 'questionTextarea',
      title: '多行输入b',
    },
    {
      fe_id: 'c5',
      type: 'questionInfo',
      title: '信息b',
    },
    {
      fe_id: 'c6',
      type: 'questionInput',
      title: '输入框b',
    },
    {
      fe_id: 'c7',
      type: 'questionRadio',
      title: '单选框b',
    },
    {
      fe_id: 'c8',
      type: 'questionCheckbox',
      title: '多选框b',
    },
  ];
}

module.exports = getComponentList;
