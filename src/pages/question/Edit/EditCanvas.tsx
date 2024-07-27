import React , { FC } from 'react';
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component';
import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component';

const EditCanvas: FC = () => {
    return (
        <div>
            <QuestionTitle text= "aaa" isCenter={true} level={2}/>
            <QuestionInput />
        </div>
    )
}

export default EditCanvas