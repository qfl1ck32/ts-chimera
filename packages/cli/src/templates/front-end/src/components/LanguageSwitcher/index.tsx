import { Select, Flex, Text } from '@chakra-ui/react';

export interface Props {
  locales: string[];
  currentLocale: string;
  onLocaleChange: (language: string) => void;
}

const LanguageSwitcher: React.FC<Props> = (props) => {
  return (
    <Flex alignItems="center" justifyContent="flex-end">
      <Text mr="2">Language:</Text>
      <Select
        value={props.currentLocale}
        onChange={(e) => props.onLocaleChange(e.target.value)}
        size="sm"
        variant="unstyled"
        color="white"
        bgColor="purple.700"
        borderRadius="md"
        border="none"
        boxShadow="md"
        _hover={{ bgColor: 'purple.800' }}
        _focus={{ outline: 'none' }}
      >
        {props.locales.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </Select>
    </Flex>
  );
};

export default LanguageSwitcher;
