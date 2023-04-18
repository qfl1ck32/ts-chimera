import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
} from '@chakra-ui/react';
export interface ILocale {
  value: string;
  label: string;
}
export interface Props {
  locales: ILocale[];
  currentLocale: ILocale;
  onLocaleChange: (language: string) => void;
}

const LanguageSwitcher: React.FC<Props> = (props) => {
  return (
    <VStack spacing={4} alignItems="center">
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          colorScheme="blue"
          fontWeight="bold"
          fontSize="lg"
        >
          {props.currentLocale.label}
        </MenuButton>
        <MenuList borderColor="gray.300">
          {props.locales.map((locale) => (
            <MenuItem
              key={locale.value}
              value={locale.value}
              onClick={() => props.onLocaleChange(locale.value)}
              fontWeight={
                locale.value === props.currentLocale.value ? 'bold' : 'normal'
              }
            >
              {locale.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </VStack>
  );
};

export default LanguageSwitcher;
