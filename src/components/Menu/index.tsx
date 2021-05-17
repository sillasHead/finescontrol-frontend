import MenuItem from 'components/MenuItem';
import './styles.scss';

export default function Menu() {
  return (
    <div className="menu-container">
      <MenuItem selected={true} />
      <MenuItem selected={false} />
      <MenuItem selected={false} />
      <MenuItem selected={false} />
    </div>
  );
}
