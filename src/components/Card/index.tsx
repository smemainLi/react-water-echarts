import React, { FC } from "react";

import "./style.css";

export interface CardProps {
  className?: string;
  title: React.ReactNode;
  titleClassName: string;
}

export const Card: FC<CardProps> = props => {
  const { className, title, titleClassName, children } = props;
  return (
    <div className={`card ${className}`}>
      <div className={titleClassName}>{title}</div>
      <div className="card-content">{children}</div>
    </div>
  )
}

export default Card