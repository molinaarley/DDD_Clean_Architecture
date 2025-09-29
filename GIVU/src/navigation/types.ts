export type AuthStackParamList = {
  Login: undefined;
  PhoneNumber: { preset?: "phone" | "email" } | undefined;
  OtpVerification: { phoneE164: string };
  PasswordSetup: { phoneE164?: string; email?: string };
  ProfileSetup: { fromOnboarding?: boolean };
  EmailInput: undefined;
  EmailVerificationPending: { email: string };
  HomePlaceholder: undefined;
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = {
  navigation: any; // Will be properly typed with @react-navigation/native
  route: {
    params: AuthStackParamList[T];
  };
};
