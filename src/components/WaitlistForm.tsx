import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { PRICING_METHODS } from '../lib/config';
import { colors } from '../lib/theme';
import { isValidEmail, joinWaitlist } from '../lib/waitlist';

type Status = 'idle' | 'sending' | 'done' | 'error';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [method, setMethod] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function submit() {
    if (status === 'sending') return;
    if (!isValidEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }
    if (!method) {
      setStatus('error');
      setMessage('Please pick how you price your work today.');
      return;
    }
    setStatus('sending');
    setMessage('');
    try {
      await joinWaitlist({ email, pricingMethod: method });
      setStatus('done');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again in a moment.');
    }
  }

  if (status === 'done') {
    return (
      <View style={styles.card} accessibilityLiveRegion="polite">
        <Text style={styles.doneTitle}>You're on the list ✓</Text>
        <Text style={styles.doneText}>
          Thanks! We'll email you when early access opens. No spam, ever.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Join the waitlist</Text>
      <Text style={styles.cardSub}>Get early access and founding-member pricing.</Text>

      <Text style={styles.label} nativeID="email-label">
        Email
      </Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="you@yourshop.com"
        placeholderTextColor="#A39A90"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        inputMode="email"
        accessibilityLabelledBy="email-label"
        aria-label="Email"
        returnKeyType="done"
      />

      <Text style={styles.label}>How do you price your work today?</Text>
      <View style={styles.options} accessibilityRole="radiogroup">
        {PRICING_METHODS.map((option) => {
          const selected = method === option;
          return (
            <Pressable
              key={option}
              onPress={() => setMethod(option)}
              accessibilityRole="radio"
              accessibilityState={{ checked: selected }}
              style={({ pressed }) => [
                styles.option,
                pressed && !selected && styles.optionHover,
                selected && styles.optionSelected,
              ]}
            >
              <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {status === 'error' && !!message && (
        <Text style={styles.error} accessibilityLiveRegion="polite">
          {message}
        </Text>
      )}

      <Pressable
        onPress={submit}
        disabled={status === 'sending'}
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonActive,
        ]}
      >
        {status === 'sending' ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Get early access</Text>
        )}
      </Pressable>
      <Text style={styles.fine}>Free to join. Unsubscribe anytime.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 22,
    width: '100%',
    maxWidth: 440,
    shadowColor: '#3B2A1A',
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  cardTitle: { fontSize: 20, fontWeight: '700', color: colors.text },
  cardSub: { fontSize: 15, color: colors.muted, marginTop: 4, marginBottom: 18 },
  label: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16, // 16+ stops iPhones from zooming in on tap
    color: colors.text,
    backgroundColor: '#FFFDF9',
    marginBottom: 18,
  },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 18 },
  option: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: '#FFFDF9',
  },
  optionHover: { borderColor: colors.accent },
  optionSelected: { backgroundColor: colors.accent, borderColor: colors.accent },
  optionText: { fontSize: 14, color: colors.text },
  optionTextSelected: { color: '#fff', fontWeight: '600' },
  error: { color: colors.error, fontSize: 14, marginBottom: 12 },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    minHeight: 52,
    justifyContent: 'center',
  },
  buttonActive: { backgroundColor: colors.accentDark },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  fine: { fontSize: 13, color: colors.muted, textAlign: 'center', marginTop: 10 },
  doneTitle: { fontSize: 22, fontWeight: '700', color: colors.success, marginBottom: 8 },
  doneText: { fontSize: 16, color: colors.text, lineHeight: 24 },
});
