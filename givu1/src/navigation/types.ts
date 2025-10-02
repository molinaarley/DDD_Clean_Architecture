export type AuthStackParamList = {
  Login: undefined;
  PhoneNumber: { preset?: "phone" | "email" } | undefined;
  OtpVerification: { phoneE164: string };
  PasswordSetup: { phoneE164?: string; email?: string };
  ProfileSetup: { fromOnboarding?: boolean };
  EmailInput: undefined;
  EmailVerificationPending: { email: string };
  HomePlaceholder: undefined;
  ChatList: undefined;
  ChatDetail: { user: { id: string; name: string; lastMessage: string; timestamp: string; isOnline?: boolean; unreadCount?: number; avatar?: string; country?: string; isVerified?: boolean } };
};

export type RootAuthStackParamList = AuthStackParamList;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = {
  navigation: any; // Will be properly typed with @react-navigation/native
  route: {
    params: AuthStackParamList[T];
  };
};
