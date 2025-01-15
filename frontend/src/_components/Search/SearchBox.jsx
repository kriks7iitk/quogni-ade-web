import React from 'react';
import ReactSearchBox from 'react-search-box';
import SolidThemeIcon from '../../_icons/svgs/SolidThemeIcons';

const data = [
  {
    key: 'john',
    value: 'John Doe',
  },
  {
    key: 'jane',
    value: 'Jane Doe',
  },
  {
    key: 'mary',
    value: 'Mary Phillips',
  },
  {
    key: 'robert',
    value: 'Robert',
  },
  {
    key: 'karius',
    value: 'Karius',
  },
];

export default function SearchBox({ height = '30px', leftIcon }) {
  return (
    <div>
      <ReactSearchBox
        placeholder="Placeholder"
        value="Doe"
        data={data}
        callback={(record) => console.log(record)}
        inputHeight={height}
        leftIcon={!!leftIcon ? leftIcon : <SolidThemeIcon name="search" />}
      />
    </div>
  );
}
