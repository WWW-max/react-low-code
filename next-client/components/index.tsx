import QuestionCheckbox from './QuestionCheckbox/QuestionCheckbox';
import QuestionInfo from './QuestionInfo/QuestionInfo';
import QuestionInput from './QuestionInput/QuestionInput';
import QuestionParagraph from './QuestionParagraph/QuestionParagraph';
import QuestionRadio from './QuestionRadio/QuestionRadio';
import QuestionTextarea from './QuestionTextarea/QuestionTextarea';
import QuestionTitle from './QuestionTitle/QuestionTitle';

type ComponentInfoType = {
  fe_id: string;
  type: string;
  // title: string
  isHidden: string;
  props: any;
};
export const getComponent = (compInfo: ComponentInfoType) => {
  const { fe_id, type, isHidden, props = {} } = compInfo;

  if (isHidden) return null;

  switch (type) {
    case 'questionInfo':
      return <QuestionInfo {...props} />;
    case 'questionTitle':
      return <QuestionTitle {...props} />;
    case 'questionParagraph':
      return <QuestionParagraph {...props} />;
    case 'questionRadio':
      return <QuestionRadio fe_id={fe_id} props={props} />;
    case 'questionCheckbox':
      return <QuestionCheckbox fe_id={fe_id} props={props} />;
    case 'questionInput':
      return <QuestionInput fe_id={fe_id} props={props} />;
    case 'questionTextarea':
      return <QuestionTextarea fe_id={fe_id} props={props} />;
    default:
      return null;
  }
};
