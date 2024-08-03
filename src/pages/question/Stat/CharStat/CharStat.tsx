import { useRequest } from 'ahooks';
import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getComponentStatService } from '../../../../services/stat';
import { getComponentConfByType } from '../../../../components/QuestionComponents';

const { Title } = Typography;

type PropsType = {
  selectedComponentId: string;
  selectedComponentType: string;
};

export default function CharStat(props: PropsType) {
  const { selectedComponentId, selectedComponentType } = props;
  const { id = '' } = useParams();

  const [stat, setStat] = useState([]);

  /** 获取组件统计数据 */
  const { run } = useRequest(
    async (questionId, componentId) => await getComponentStatService(questionId, componentId),
    {
      manual: true,
      onSuccess(res) {
        setStat(res.stat);
      },
    }
  );

  useEffect(() => {
    if (selectedComponentId) run(id, selectedComponentId);
  }, [id, selectedComponentId]);

  /** 生成统计图表 */
  const genStatElem = () => {
    if (!selectedComponentId) return <div>未选中组件</div>;

    const { StatComponent } = getComponentConfByType(selectedComponentType) || {};
    if (StatComponent == null) return <div>该组件没有统计图表</div>;

    return <StatComponent stat={stat} />;
  };
  return (
    <>
      <Title level={3}>图表统计(针对单选/多选框选项比例)</Title>
      <div>{genStatElem()}</div>
    </>
  );
}
