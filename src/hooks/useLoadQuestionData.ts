import { useRequest } from "ahooks";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleQuestionService } from "../services/question";
import { useEffect } from "react";
import { resetComponents } from "../store/componentsReducer";

function useLoadQuestionData() {
    const { id =  '' } = useParams();
    const dispatch = useDispatch();

    /** ajax 加载获取组件列表信息 */
    const { data, loading, error, run } = useRequest(
        async (id: string) => {
            if (!id) throw new Error('没有问卷 id');
            const data = await getSingleQuestionService(id);
            return data;
        }
    )
    /** 根据获取的data 设置 redux store */
    useEffect(() => {
        if (!data) return;

        const {
            componentList = [],
        } = data;

        /** 获取默认的 selectedId */
        let selectedId = '';
        if (componentList.length > 0) {
            selectedId = componentList[0]?.fe_id; // 默认选中第一个组件
        }

        /** 把 componentList 存储到 Redux store 中 */
        dispatch(resetComponents({ componentList, selectedId}));
    }, [data]);

    /** 判断 id 变化，执行ajax加载问卷数据 */
    useEffect(() => {
        run(id);
    }, [id]);

    return { loading, error} ;
}

export default useLoadQuestionData;