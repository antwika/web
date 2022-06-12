import styles from './Button.module.css';

type Preset = 'large' | 'medium' | 'small';

type Props = {
  preset?: Preset,
  children: any,
  type: 'button' | 'submit' | 'reset' | undefined,
  onClick: () => void,
}

const Button: React.FC<Props> = ({ preset, type, children, onClick }) => {
  const presetButtonStyle = styles[`preset__button__${preset}`]
  return (
    <>
      <button
        data-cy='ui-button'
        className={styles.button + ' ' + presetButtonStyle}
        type={type}
        onClick={() => onClick()}
      >
        {children}
      </button>
    </>
  )
}

Button.defaultProps = {
  preset: 'medium',
}

export default Button;
