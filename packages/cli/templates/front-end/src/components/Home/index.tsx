import { Center, Container, Heading } from '@chakra-ui/react';

import LanguageSwitcherContainer from '@src/containers/LanguageSwitcher';
import { useTranslation } from '@src/hooks';

const Home: React.FC = () => {
  const t = useTranslation('components.Home');

  return (
    <Center
      display="flex"
      flexDirection="column"
      h="100vh"
      bgColor="purple.600"
    >
      <Container maxW="container.md" textAlign="center" borderRadius="lg" p="6">
        <Heading size="2xl" color="white">
          {t('welcome')}
        </Heading>
      </Container>
      <LanguageSwitcherContainer />
    </Center>
  );
};

export default Home;
