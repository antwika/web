import { useRouter } from "next/router";
import Button from "./ui/Button";
import styles from './LocalePicker.module.css';

type Props = {
  locales: string[],
};

const LocalePicker: React.FC<Props> = ({ locales }) => {
  const router = useRouter();

  const changeLocale = (nextLocale: string) => {
    const { pathname, query, asPath } = router;
    router.push({ pathname, query }, asPath, { locale: nextLocale });
  }

  return (
    <div data-testid='locale-picker' className={styles.container}>
      {locales.map(locale => (
        <div key={`locale_${locale}`}>
          <Button preset="small" onClick={() => changeLocale(locale)}>{locale}</Button>
        </div>
      ))}
    </div>
  );
}

export default LocalePicker;
