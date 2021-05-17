import React from 'react';
import './styles.scss';

type Props = {
  children: React.ReactNode;
};

export default function FormItem({ children }: Props) {
  return (
    <div className="form-item">
      {children}
    </div>
  );
}
