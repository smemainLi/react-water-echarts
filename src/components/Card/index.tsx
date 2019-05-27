import React, { FC } from "react";

import "./style.css";

export interface CardProps {
  className?: string;
  title: React.ReactNode;
}

export const Card: FC<CardProps> = props => {
  const { title, className, children } = props;
  return (
    <div className={`card ${className}`}>
      <div className="card-title">{title}</div>
      <div className="card-content">{children}</div>
    </div>
  )
}

export default Card