import { Center, Container, Heading } from '@chakra-ui/react';
import LanguageSwitcherContainer from '@src/containers/LanguageSwitcher';

import { useTranslation } from '@src/hooks';

export interface Props {
  name: string;
}

const Home: React.FC<Props> = (props) => {
  const t = useTranslation('components.Home');

  return (
    <Center h="100vh" bgColor="purple.600">
      <Container maxW="container.md" textAlign="center" borderRadius="lg" p="6">
        <Heading size="2xl" color="white">
          {t('welcome', {
            name: props.name,
          })}
        </Heading>

        <LanguageSwitcherContainer />
      </Container>
    </Center>
  );
};

export default Home;
