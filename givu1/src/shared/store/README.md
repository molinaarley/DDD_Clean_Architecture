# Zustand Stores Documentation

This directory contains all the Zustand stores for the GIVU application. Each store manages a specific domain of the application state.

## Store Overview

### 1. Auth Store (`auth.store.ts`)
Manages user authentication state and user data.

**State:**
- `user`: Current user information (id, nickname, avatarUrl)
- `accessToken`: JWT access token
- `refreshToken`: JWT refresh token
- `identifier`: Login identifier (phone/email)
- `isNewUser`: Whether this is a new user
- `isAuthenticated`: Authentication status

**Actions:**
- `setIdentifier(type, value)`: Set login identifier
- `setTokens(access, refresh)`: Set authentication tokens
- `setUser(user)`: Set user data
- `updateUser(updates)`: Update user data
- `markNewUser(isNew)`: Mark as new user
- `logout()`: Clear all auth data
- `reset()`: Reset to initial state

**Persistence:** ✅ Persisted with AsyncStorage

### 2. Onboarding Store (`onboarding.store.ts`)
Manages user onboarding progress.

**State:**
- `hasPassword`: Whether user has set a password
- `completedProfile`: Whether profile is complete
- `seenIntro`: Whether user has seen intro

**Actions:**
- `setHasPassword(hasPassword)`: Set password status
- `setCompletedProfile(completed)`: Set profile completion
- `setSeenIntro(seen)`: Set intro seen status
- `isOnboardingComplete()`: Check if onboarding is complete
- `reset()`: Reset onboarding state

**Persistence:** ✅ Persisted with AsyncStorage

### 3. UI Store (`ui.store.ts`)
Manages UI state and modals.

**State:**
- `theme`: App theme (light/dark/system)
- `loading`: Global loading state
- `modal`: Modal state and content
- `bottomSheet`: Bottom sheet state

**Actions:**
- `setTheme(theme)`: Set app theme
- `setLoading(loading)`: Set loading state
- `openModal(content, type, title)`: Open modal
- `closeModal()`: Close modal
- `openBottomSheet(content)`: Open bottom sheet
- `closeBottomSheet()`: Close bottom sheet
- `reset()`: Reset UI state

**Persistence:** ⚠️ Partially persisted (theme only)

### 4. Call Store (`call.store.ts`)
Manages video/audio call state.

**State:**
- `status`: Call status (idle/matching/ringing/connecting/inCall/ended)
- `currentCall`: Current call information
- `callHistory`: Call history
- `settings`: Call settings (mute, video, speaker, blur)

**Actions:**
- `startMatching()`: Start matching for calls
- `startCall(participants, isVideoCall)`: Start a call
- `answerCall(callId)`: Answer incoming call
- `rejectCall(callId)`: Reject incoming call
- `endCall()`: End current call
- `toggleMute()`: Toggle microphone
- `toggleVideo()`: Toggle camera
- `toggleSpeaker()`: Toggle speaker
- `toggleBlur()`: Toggle background blur
- `addToHistory(call)`: Add call to history
- `clearHistory()`: Clear call history
- `reset()`: Reset call state

**Persistence:** ❌ Not persisted (session only)

### 5. Chat Store (`chat.store.ts`)
Manages chat messages and rooms.

**State:**
- `rooms`: Chat rooms list
- `currentRoomId`: Currently active room
- `messages`: Messages by room ID
- `isTyping`: Typing indicators by room
- `searchQuery`: Search query
- `filters`: Message filters

**Actions:**
- `setCurrentRoom(roomId)`: Set active room
- `addMessage(roomId, message)`: Add message
- `updateMessage(roomId, messageId, updates)`: Update message
- `deleteMessage(roomId, messageId)`: Delete message
- `markAsRead(roomId, messageId)`: Mark messages as read
- `setTyping(roomId, isTyping)`: Set typing indicator
- `addRoom(room)`: Add chat room
- `updateRoom(roomId, updates)`: Update room
- `deleteRoom(roomId)`: Delete room
- `pinRoom(roomId)`: Pin room
- `muteRoom(roomId)`: Mute room
- `setSearchQuery(query)`: Set search query
- `setFilters(filters)`: Set message filters
- `clearMessages(roomId)`: Clear room messages
- `reset()`: Reset chat state

**Persistence:** ❌ Not persisted (session only)

### 6. Notifications Store (`notifications.store.ts`)
Manages app notifications.

**State:**
- `notifications`: Notifications list
- `unreadCount`: Unread notifications count
- `settings`: Notification settings
- `isPermissionGranted`: Permission status
- `lastChecked`: Last check timestamp

**Actions:**
- `addNotification(notification)`: Add notification
- `markAsRead(notificationId)`: Mark as read
- `markAllAsRead()`: Mark all as read
- `removeNotification(notificationId)`: Remove notification
- `clearAll()`: Clear all notifications
- `clearByType(type)`: Clear by type
- `updateSettings(settings)`: Update settings
- `setPermissionGranted(granted)`: Set permission
- `getUnreadCount()`: Get unread count
- `getNotificationsByType(type)`: Get by type
- `reset()`: Reset notifications

**Persistence:** ❌ Not persisted (session only)

## Usage Examples

### Basic Store Usage

```typescript
import { useAuthStore } from '../shared/store';

function MyComponent() {
  const { user, isAuthenticated, setUser, logout } = useAuthStore();
  
  const handleLogin = () => {
    setUser({ id: '123', nickname: 'John' });
  };
  
  return (
    <View>
      {isAuthenticated ? (
        <Text>Welcome {user?.nickname}</Text>
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
    </View>
  );
}
```

### Using Custom Hooks

```typescript
import { useAuth, useIsAuthenticated, useCurrentUser } from '../shared/hooks/useStores';

function MyComponent() {
  const isAuthenticated = useIsAuthenticated();
  const user = useCurrentUser();
  const { logout } = useAuth();
  
  return (
    <View>
      {isAuthenticated && <Text>Hello {user?.nickname}</Text>}
    </View>
  );
}
```

### Multiple Stores

```typescript
import { useStores } from '../shared/hooks/useStores';

function MyComponent() {
  const { auth, ui, notifications } = useStores();
  
  const handleAction = () => {
    ui.setLoading(true);
    // Do something
    notifications.addNotification({
      type: 'success',
      title: 'Success',
      message: 'Action completed',
      priority: 'normal'
    });
    ui.setLoading(false);
  };
  
  return <Button title="Action" onPress={handleAction} />;
}
```

## Best Practices

1. **Use custom hooks** for common patterns
2. **Keep stores focused** on their domain
3. **Use selectors** to avoid unnecessary re-renders
4. **Persist only necessary data** to avoid storage bloat
5. **Reset stores** when appropriate (logout, app restart)
6. **Handle loading states** consistently
7. **Use TypeScript** for type safety

## Migration from Context/Props

To migrate from Context API or prop drilling:

1. Replace `useContext` with store hooks
2. Remove Context providers
3. Update components to use store actions
4. Remove prop drilling for state
5. Use selectors for performance optimization

## Performance Tips

- Use selectors to subscribe to specific state slices
- Avoid subscribing to entire store when possible
- Use `useCallback` for actions passed as props
- Consider using `useMemo` for derived state
- Implement proper cleanup in useEffect
