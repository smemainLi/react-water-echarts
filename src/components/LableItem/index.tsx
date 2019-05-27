import React, { FC } from 'react';

export interface LabelItemProps {
  className?: string;
  prefix?: React.ReactNode;
  content?: React.ReactNode;
  surfix?: React.ReactNode;
}

export const LabelItem: FC<LabelItemProps> = props => {
  const { className, prefix, content, surfix } = props
  return (
    <div className={className}>
      {prefix}
      {content}
      {surfix}
    </div>
  )
}

export default LabelItem