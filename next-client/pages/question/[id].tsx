import PageWrapper from '@/components/PageWrapper/PageWrapper';
import styles from './Question.module.scss';
import { getComponent } from '@/components';
import { getQuestionById } from '@/services/question';

type PropsType = {
  errno: number;
  data?: {
    id: string;
    title: string;
    desc?: string;
    js?: string;
    css?: string;
    isPublished: boolean;
    isDeleted: boolean;
    componentList: Array<any>;
  };
  msg?: string;
};
export default function Question(props: PropsType) {
  const { errno, data, msg = '' } = props;

  /** 数据错误 */
  if (errno !== 0) {
    return (
      <PageWrapper title="错误">
        <h1>错误</h1>
        <p>{msg}</p>
      </PageWrapper>
    );
  }

  const { id, title = '', desc = '', isDeleted, isPublished, componentList = [] } = data || {};

  /** 已经被删除的，提示错误 */
  if (isDeleted) {
    return (
      <PageWrapper title={title} desc={desc}>
        <h1>{title}</h1>
        <p>该问卷已经被删除</p>
      </PageWrapper>
    );
  }

  /** 尚未发布的，提示错误 */
  if (!isPublished) {
    return (
      <PageWrapper title={title} desc={desc}>
        <h1>{title}</h1>
        <p>该问卷尚未发布</p>
      </PageWrapper>
    );
  }

  /** 遍历组件 */
  const ComponentListElem = (
    <>
      {componentList.map(c => {
        const ComponentElem = getComponent(c);
        return (
          <div key={c.fe_id} className={styles.componentWrapper}>
            {ComponentElem}
          </div>
        );
      })}
    </>
  );
  return (
    <PageWrapper title={title} desc={desc}>
      <form method="post" action="/api/answer">
        {/* 隐藏域，用于表单提交问卷id数据 */}
        <input type="hidden" name="questionId" value={id} />
        {/* 组件部分 */}
        {ComponentListElem}
        {/* 提交按钮 */}
        <div className={styles.submitBtnContainer}>
          {/* <input type="submit" value="提交"/> */}
          <button type="submit">提交</button>
        </div>
      </form>
    </PageWrapper>
  );
}

/** 每次请求当前页面都会执行 */
export async function getServerSideProps(context: any) {
  const { id = '' } = context.params;

  /** 根据id获取问卷信息 */
  const data = await getQuestionById(id);

  return {
    props: data,
  };
}
