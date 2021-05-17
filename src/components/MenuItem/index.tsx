import './styles.scss';

type Props = {
  selected: boolean;
};

export default function MenuItem({ selected }: Props) {
  return (
    <>
      <div className={`menu-item ${selected ? "selected" : ""}`}>
        <p>Motorista</p>
      </div>
      <div className="line-separator" />
    </>
  );
}
