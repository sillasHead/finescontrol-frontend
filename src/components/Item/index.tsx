import styles from './styles.module.scss';

type CompleteItemProps = {
  children: React.ReactNode;
  paddingContent?: number; 
}

export function CompleteItem({ children, paddingContent }: CompleteItemProps) {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemHeader}>teste</div>
      <div 
        className={styles.itemContent}
        style={{
          padding: paddingContent
        }}
      >
        {children}
      </div>
    </div>
  );
}

type ItemProps = {
  children: React.ReactNode;
  flexDirection?: 'column' | 'row';
  alignItems?: 'center';
};

export function Item({ children, flexDirection, alignItems }: ItemProps) {
  return (
    <div
      className={styles.item}
      style={{
        flexDirection: flexDirection,
        alignItems: alignItems
      }}
    >
      {children}
    </div>
  );
}
