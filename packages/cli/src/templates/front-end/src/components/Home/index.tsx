import useTranslation from '@src/hooks/useTranslation';

export interface Props {
  name: string;
}

const Home: React.FC<Props> = (props) => {
  const t = useTranslation('components.Home');

  return (
    <h5>
      {t('hello', {
        name: props.name,
      })}
    </h5>
  );
};

export default Home;
