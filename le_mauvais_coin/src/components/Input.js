import React from 'react';

const Input = (props) => {
  return (
    <div>
      <input
        type="text"
        className={
          'border-[1px] border-slate-300 rounded-2xl py-[10px] pl-3 ' +
          props.width
        }
      />
    </div>
  );
};

export default Input;
