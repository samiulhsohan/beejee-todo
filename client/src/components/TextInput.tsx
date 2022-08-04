import {
  FormControl,
  FormErrorMessage,
  forwardRef,
  Input,
  InputProps,
} from '@chakra-ui/react'
import { LegacyRef } from 'react'

interface TextInputProps extends InputProps {
  isInvalid?: boolean
  error?: string
}

function TextInput(
  { isInvalid, error, ...props }: TextInputProps,
  ref: LegacyRef<HTMLInputElement>,
) {
  return (
    <FormControl {...{ isInvalid }}>
      <Input {...props} ref={ref} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}

export default forwardRef(TextInput)
