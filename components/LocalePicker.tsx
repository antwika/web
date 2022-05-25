import { useRouter } from "next/router";

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
    <>
      {locales.map(locale => (<a key={`locale_${locale}`} onClick={() => changeLocale(locale)}>{locale}{' '}</a>))}
    </>
  );
}

export default LocalePicker;
