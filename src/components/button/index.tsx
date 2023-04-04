import './index.less'
interface ButtonProps {
  title: string,
  onClick?: () => void | undefined,
}
const Button = (props: ButtonProps) => {
  const { title, onClick } = props;
  return <div className={`com_button`} onClick={ onClick ? onClick : () => {}}>
    <div>{title}</div>
  </div>
}
export default Button