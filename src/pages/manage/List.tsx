// import { produce } from 'immer';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import { Empty, Space, Spin, Typography } from 'antd';
import styles from './common.module.scss';
import ListSearch from '../../components/ListSearch/ListSearch';
import { useDebounceFn, useRequest, useTitle } from 'ahooks';
import { getQuestionServices } from '../../services/question';
import { useSearchParams } from 'react-router-dom';
import { LIST_PAGE_SIZE } from '../../constant';

const { Title } = Typography;

export default function List() {
  /** 修改标题 */
  useTitle('问卷低代码平台 - 我的问卷');
  /** 是否已经开始加载（防抖，有延迟时间） */
  const [started, setStarted] = useState(false);
  /** List 内部的数据，不在 url 参数中体现 */
  const [page, setPage] = useState(1);
  /** 问卷列表数据，全部的列表数据，上划加载更多，累计 */
  const [list, setList] = useState([]);
  /** 总数 */
  const [total, setTotal] = useState(0);
  /** 是否有更多的，未加载完的数据 */
  const haveMoreData = total > list.length;
  /** url参数 */
  const [searchParams] = useSearchParams();
  /** 搜索关键字 */
  const keyword = searchParams.get('keyword') || '';

  /** 获取问卷列表, useRequest封装 */
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionServices({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      });
      return data;
    },
    {
      manual: true, // 手动触发模式，页面初始化后不会自动执行
      onSuccess: result => {
        const { list: l = [], total = 0 } = result;
        setList(list.concat(l)); // 累计
        setTotal(total);
        setPage(page + 1);
      },
    }
  );
  /** 尝试去触发加载 - 防抖 */
  const containerRef = useRef<HTMLDivElement>(null);
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const ele = containerRef.current;
      if (ele === null) return;
      const domRect = ele.getBoundingClientRect();
      if (domRect?.bottom <= document.body.clientHeight) {
        load(); // 真正加载数据
        setStarted(true);
      }
    },
    { wait: 1000 }
  );
  /** 1. 当页面加载，或者url参数(keyword)变化时，触发加载 */
  useEffect(() => {
    tryLoadMore(); // 加载第一页，初始化
  }, [searchParams]);
  /** 2. 当页面滚动时，要尝试触发加载 */
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore);
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore);
    };
  });
  /** 底部加载更多部分 */
  const LoadMoreContent = useMemo(() => {
    if (!started || loading) return <Spin />;
    if (total === 0) return <Empty description="暂无数据" />;
    if (!haveMoreData) return <span>没有更多了...</span>;
    return <span>开始加载下一页</span>;
  }, [started, loading, haveMoreData]);
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {/* 问卷列表 */}
          {list.length > 0 && list.map((item: any) => <QuestionCard key={item._id} {...item} />)}
        </Space>
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContent}</div>
      </div>
    </div>
  );
}
