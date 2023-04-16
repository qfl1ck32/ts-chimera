import { Flex } from '@chakra-ui/react';

import Loader from '@src/components/Loader';

const ScreenLoader: React.FC = () => {
  return (
    <Flex
      height="100vh"
      width="100%"
      justifyContent="center"
      alignItems="center"
      backgroundColor="rgba(255, 255, 255, 0.8)"
      position="fixed"
      zIndex={999}
    >
      <Loader />
    </Flex>
  );
};

export default ScreenLoader;
