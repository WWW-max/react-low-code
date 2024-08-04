import React, { FC } from 'react';
import styles from './QuestionRadio.module.scss';

type PropsType = {
  fe_id: string;
  props: {
    title: string;
    options: Array<{
      value: string;
      text: string;
    }>;
    value: string;
    isVertical: boolean;
  };
};

const QuestionRadio: FC<PropsType> = ({ fe_id, props }) => {
  const { title, options = [], value, isVertical } = props || {};

  return (
    <>
      <p>{title}</p>
      <ul className={styles.list}>
        {options.map(opt => {
          const { value: val, text } = opt;
          return (
            <li key={val} className={isVertical ? styles.verticalItem : styles.horizontalItem}>
              <label>
                <input type="radio" name={fe_id} value={val} defaultChecked={val === value} />
                {text}
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default QuestionRadio;
