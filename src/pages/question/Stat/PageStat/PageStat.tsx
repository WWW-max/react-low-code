import { useRequest } from 'ahooks';
import React, { useState } from 'react';
import { STAT_PAGE_SIZE } from '../../../../constant';
import { getQuestionStatListService } from '../../../../services/stat';
import { useParams } from 'react-router-dom';
import useGetComponentInfo from '../../../../hooks/useGetComponentInfo';
import { Pagination, Spin, Table, Typography } from 'antd';

const { Title } = Typography;

type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};
export default function PageStat(props: PropsType) {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props;

  const { id = '' } = useParams();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  /** 获取问卷统计列表数据 */
  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatListService(id, { page, pageSize });
      return res;
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess(res) {
        const { total, list = [] } = res;
        setTotal(total);
        setList(list);
      },
    }
  );

  /** 生成表格列数据 */
  const { componentList } = useGetComponentInfo();
  const columns = componentList.map(c => {
    const { fe_id, title, props = {}, type } = c;

    const colTitle = props!.title || title;

    return {
      // title: colTitle,
      title: (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedComponentId(fe_id);
            setSelectedComponentType(type);
          }}
        >
          <span style={{ color: fe_id === selectedComponentId ? '#1890ff' : 'inherit' }}>
            {colTitle}
          </span>
        </div>
      ),
      dataIndex: fe_id,
    };
  });

  /** 表格数据 */
  const dataSource = list.map((i: any) => ({ ...i, key: i._id }));

  /** 表格 */
  const TableElem = (
    <>
      <Table columns={columns} dataSource={dataSource} pagination={false}></Table>
      <div style={{ textAlign: 'center', marginTop: '18px' }}>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={page}
          onChange={page => setPage(page)}
          onShowSizeChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }}
        />
      </div>
    </>
  );
  return (
    <div>
      <Title level={3}>答卷数量: {!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
      {!loading && TableElem}
    </div>
  );
}
