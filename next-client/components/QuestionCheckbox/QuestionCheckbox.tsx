import React, { FC, useEffect, useState } from 'react';
import styles from './QuestionCheckbox.module.scss';

type PropsType = {
  fe_id: string;
  props: {
    title: string;
    isVertical?: boolean;
    list: Array<{
      value: string;
      text: string;
      checked: boolean;
    }>;
  };
};

const QuestionCheckbox: FC<PropsType> = ({ fe_id, props }) => {
  const { title, isVertical, list = [] } = props;

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  /** 初始化时，判断默认选中 */
  useEffect(() => {
    list.forEach(item => {
      const { value, checked } = item;
      if (checked) {
        setSelectedValues(selectedValues => selectedValues.concat(value));
      }
    });
  }, [list]);

  /** 切换选中 */
  function toggleChecked(value: string) {
    if (selectedValues.includes(value)) {
      // 已经被选中了，则取消选择
      setSelectedValues(selectedValues => selectedValues.filter(v => v !== value));
    } else {
      // 未被选中，则增加选择
      setSelectedValues(selectedValues.concat(value));
    }
  }

  return (
    <>
      <p>{title}</p>

      <input type="hidden" name={fe_id} value={selectedValues.toString()} />

      <ul className={styles.list}>
        {list.map(item => {
          const { value, text } = item;

          return (
            <li key={value} className={isVertical ? styles.verticalItem : styles.horizontalItem}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedValues.includes(value)}
                  onChange={() => toggleChecked(value)}
                />
                {text}
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default QuestionCheckbox;
