import React from 'react';
import './styles.scss'

type Props = {
  children: React.ReactNode;
}

export default function Modal({ children }: Props) {
  return (
    <div className="background-modal">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
}
